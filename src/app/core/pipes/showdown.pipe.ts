import { Pipe, PipeTransform } from '@angular/core';

function getWindow (): any {
  return window;
}


@Pipe({
  name: 'showdown'
})
export class ShowdownPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    var converter = new (getWindow().showdown).Converter();
    return converter.makeHtml(value);
  }

}
