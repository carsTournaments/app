import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fuel',
})
export class FuelPipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'diesel':
                return 'Diesel';
            case 'gasoline':
                return 'Gasolina';
            case 'hybrid':
                return 'Hibrido';
            case 'electric':
                return 'Eléctrico';
            default:
                return 'N/D';
        }
    }
}
