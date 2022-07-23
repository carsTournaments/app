import { countries } from './../../../../assets/json/countries';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'countryByValue',
})
export class CountryByValue implements PipeTransform {
    transform(value: string): string {
        return countries.filter((country) => country.id === value)[0].name;
    }
}
