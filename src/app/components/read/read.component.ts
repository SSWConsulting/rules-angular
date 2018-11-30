import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubService } from '../../core/services/github.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  public content$: Observable<any>;
  public url: string;

  constructor(private gitHub: GithubService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.url = this.route.snapshot.url.map(u => u.path).join('/');

    if (this.url) {
      this.content$ = this.gitHub.getContent(this.url);
    } else {
      this.content$ = this.gitHub.getReadme();
    }
  }

}
