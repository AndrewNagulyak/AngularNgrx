import {Pipe, PipeTransform} from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {
  transform(value: string, format: string = 'HH:mm Z'): any {
    let date = moment(value);
    if (!moment(value).isValid()) {
      date = moment('1970-01-01T' + value);
    }

    return date.format(format);
  }
}
