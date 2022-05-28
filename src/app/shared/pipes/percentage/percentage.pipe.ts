import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'percentage',
})
export class PercentagePipe implements PipeTransform {
    transform(data: { car: string }[], car: string): any {
        if (data && data.length > 0) {
            const percentage = Math.round(
                (data.filter((item) => item.car === car).length / data.length) *
                    100
            );
            return `${percentage}%`;
        } else {
            return '0%';
        }
    }
}
