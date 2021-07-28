import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hiddenPhone'
})
export class HiddenPhonePipe implements PipeTransform {

  transform(value: string, code: string): any {

    if (value && value.length > 4) {
      return code + ' ' + '*'.repeat(value.length - 4) + value.substring(value.length - 4, value.length - 2)
        + ' ' + value.substring(value.length - 2, value.length - 0);
    }
    else { return value; }
  }

}
