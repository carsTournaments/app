import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstLetterCase',
})
export class FirstLetterPipe implements PipeTransform {
    transform(value: string): string {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }
}
