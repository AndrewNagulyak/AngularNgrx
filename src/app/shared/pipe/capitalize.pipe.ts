import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return !!(value) ? value.toString().replace(/^\w/, c => c.toUpperCase()) : '';
  }

}
