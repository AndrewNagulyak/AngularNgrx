import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'elapsedSince'
})
export class ElapsedSincePipe implements PipeTransform {


  transform(data: string): any {
    const minutesElapsed = moment().diff(moment(data), 'seconds')
    const duration = moment.duration(minutesElapsed, 'seconds') as Duration;
    if (duration.days() >= 10) {
      return '10d late';
    } else if (duration.days() > 0) {
      return duration.days() + 'd';
    } else if (duration.hours() > 0) {
      return duration.hours() + 'h';
    } else if (duration.minutes() > 0) {
      return duration.minutes() + 'm';
    } else {
      return duration.seconds() + 's';
    }
  }

}

interface Duration extends moment.Duration {
  format: (template?: string, precision?: number, settings?: DurationSettings) => string;
}

interface DurationSettings {
  forceLength: boolean;
  precision: number;
  template: string;
  trim: boolean | 'left' | 'right';
}
