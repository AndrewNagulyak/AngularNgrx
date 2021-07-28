import {Pipe, PipeTransform} from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'waitingTime'
})
export class WaitingTimePipe implements PipeTransform {

  transform(value: Date, ...args: any[]): any {
    const createdAt = moment(value);
    const waitingTime = moment.unix(moment().unix() - createdAt.unix()).utc(false);
    let result = '';
    if (waitingTime.dayOfYear() > 1) {
      result = (parseInt(waitingTime.format('DDD')) - 1) + ' d ' + waitingTime.format('HH:mm:ss') + ' h';
    } else {
      result = waitingTime.format('HH:mm:ss') + ' h';
    }
    return result;
  }

}
