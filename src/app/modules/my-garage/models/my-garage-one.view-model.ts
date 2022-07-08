import { Header } from '@components/header/model/header.model';
import { Car } from '@models';

export class MyGarageOneViewModel {
    header = new Header({
        title: 'Garage',
        backButton: {
            state: true,
            route: 'garage',
        },
    });
    id: string;
    car: Car = new Car();
    edit = true;
    brandIdSelected = '';
    loading = true;
    error = false;
}
