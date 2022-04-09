import { Header } from 'src/app/components/header/model/header.model';
import { Car } from 'src/app/models';

export class CarsOneViewModel {
    id: string;
    header = new Header({
        title: 'Coches',

        backButton: {
            state: true,
            route: '/tab/cars',
        },
    });
    car: Car;
    image: string;
}
