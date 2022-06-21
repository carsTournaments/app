import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'momentDateShort',
})
export class MomentDateShortPipe implements PipeTransform {
    transform(dateTime: string, uppercase = false): string {
        const date = moment(dateTime).locale('es').format('DD MMM');
        if (!uppercase) {
            return date.slice(0, -1);
        } else {
            return date.slice(0, -1).toUpperCase();
        }
    }
}
