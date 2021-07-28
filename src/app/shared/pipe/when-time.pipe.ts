import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'whenTime'
})
export class WhenTimePipe implements PipeTransform {

  transform(value: string): any {
    const time = moment(value);
    let result = '';
    if (time.isSame(moment(), 'day')) {
      result = 'Today, ' + time.format('HH:mm');
    } else if (time.diff(moment().add(-1, 'day'), 'day') === 0) {
      result = 'Yesterday, ' + time.format('HH:mm');
    } else {
      moment.locale(window.navigator['userLanguage'] || window.navigator.language);
      result = time.format(moment.localeData().longDateFormat('L'))
    }
    return result;
  }

}
