import { Header } from 'src/app/components/header/model/header.model';
import { Car } from 'src/app/models';

export class GarageOneViewModel {
    header = new Header({
        title: 'Garage',
        backButton: {
            state: true,
            route: '/tab/account/garage',
        },
    });
    id: string;
    car: Car;
}
