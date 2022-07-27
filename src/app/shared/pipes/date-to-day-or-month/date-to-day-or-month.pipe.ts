import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateToDayOrMonth',
})
export class DateToDayOrMonthPipe implements PipeTransform {
  transform(value: string, dayOrMonth = 'day'): string {
    return dayOrMonth === 'day'
      ? moment(value).format('DD')
      : moment(value).format('MMM');
  }
}
