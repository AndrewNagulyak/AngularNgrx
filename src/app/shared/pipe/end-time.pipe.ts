import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'endTime'
})
export class EndTimePipe implements PipeTransform {

  transform(times: string[], endTime: string): string[] {
    const timeIndex = times.findIndex(item => item === endTime);
    console.log('timeIndex', timeIndex);
    console.log('times.length', times.length);
    if (timeIndex >= 0) {
      const newTimes = [...times];
      const shift = newTimes.shift();
      const sliced = newTimes.slice(timeIndex);
      sliced.unshift(shift);
      return sliced;
    } else {
      return times;
    }
  }

}
