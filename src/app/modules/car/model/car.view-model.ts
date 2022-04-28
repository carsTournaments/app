import { Header } from 'src/app/components/header/model/header.model';
import { Car, User } from 'src/app/models';

export class CarViewModel {
    id: string;
    header = new Header({
        title: 'Coches',
        backButton: {
            state: true,
            route: '/tab/cars',
        },
    });
    user: User;
    car: Car;
    isMyCar: boolean = false;
    image: string;
    loading = true;
    error = false;
    liked = false;
}
