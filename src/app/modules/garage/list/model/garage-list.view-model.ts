import { Header } from 'src/app/components/header/model/header.model';
import { Car, User } from 'src/app/models';

export class GarageListViewModel {
    header = new Header({
        title: 'Garage',
        backButton: {
            state: true,
            route: '/tab/account',
        },
    });
    user: User;
    cars: Car[];
    error = false;
    loading = true;
}
