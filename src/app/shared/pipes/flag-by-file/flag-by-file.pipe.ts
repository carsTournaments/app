import { Pipe, PipeTransform } from '@angular/core';
import { flags } from 'assets/json/flags';

@Pipe({
    name: 'flagByFile',
})
export class FlagByFilePipe implements PipeTransform {
    transform(countryCode: string): string {
        return flags[countryCode];
    }
}
