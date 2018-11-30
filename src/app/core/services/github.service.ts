import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  //todo: Chris to learn how to inject the httpclient and how to use typescript
  //todo: Chris to create an API specification for GitHub
  private baseUrl: string = 'https://api.github.com';
  private raw: string;
  constructor(private httpClient: HttpClient, @Inject('REPO') private repo: string, @Inject('ACCOUNT') private account: string) {
    this.raw = `https://raw.githubusercontent.com/${account}/${repo}/master/`;
  }

  getReadme(): Observable<any> {
    let url = `${this.baseUrl}/repos/${this.account}/${this.repo}/readme`;
    return this.httpClient.get(url).pipe(filter((u: any) => !!u.content), map((r: any) => this.linkReplacement('', atob(r.content))));
  }

  getContent(path: string): Observable<any> {
    
    let url = `${this.baseUrl}/repos/${this.account}/${this.repo}/contents/${path}.md`;
    return this.httpClient.get(url).pipe(filter((u: any) => !!u.content), map((r: any) => this.linkReplacement(path, atob(r.content))));
  }

  linkReplacement(path: string, content: string) {
    if (!!!content) return;

    var rg = new RegExp(/\!\[(.*)\]\(\.?(?<url>.*)\)/gm);

    var parts = path.split('/');
    if (parts.length > 1) {
      path = parts.slice(0, parts.length - 1).join('/');
    }

    content = content.replace(rg, `![$1](${this.raw}${path}/$2)`);
    return content;
  }
}
