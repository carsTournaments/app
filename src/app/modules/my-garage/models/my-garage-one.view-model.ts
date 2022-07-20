import { Header } from '@components/header/model/header.model';
import { config } from '@config';
import { Car } from '@models';

export class MyGarageOneViewModel {
    header = new Header({
        title: 'Garaje',
        backButton: {
            state: true,
            route: config.routes.myGarage,
            default: true,
        },
    });
    id: string;
    car: Car = new Car();
    edit = true;
    brandIdSelected = '';
    loading = true;
    error = false;
}
