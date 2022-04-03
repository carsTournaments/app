import { Header } from "src/app/components/header/model/header.model";
import { Car } from "src/app/models";

export class CarsOneViewModel {
    id: string;
    header = new Header({
        title: 'Coches',
        segments: {
            items: ['Info', 'Piloto'],
            selected: 0,
        },
        backButton: {
            state: true,
            route: '/tab/cars'
        }
    });
    car: Car;
    image: string;
}
