import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'votes',
})
export class VotesPipe implements PipeTransform {
  transform(data: { car: string }[], car: string): any {
    if (data && data.length > 0) {
      return data.filter((item) => item.car === car).length;
    } else {
      return 0;
    }
  }
}
