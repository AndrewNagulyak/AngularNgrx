import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pop'
})
export class PopPipe implements PipeTransform {
  transform(value: any[], count: number = 1): any {
    const newValue = [...value];
    newValue.splice(-count, count);
    return newValue;
  }
}
