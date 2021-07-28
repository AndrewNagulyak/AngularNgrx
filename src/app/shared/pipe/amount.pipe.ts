import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {
  transform(value: number): any {
    return value.toLocaleString('en-US', {maximumFractionDigits: 2});
  }
}
