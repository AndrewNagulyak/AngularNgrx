import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: moment.Moment, format: string): any {
    return !!(value) ? value.format(format) : '';
  }

}
