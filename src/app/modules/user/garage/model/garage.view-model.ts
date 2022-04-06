import { Header } from 'src/app/components/header/model/header.model';

export class GarageViewModel {
    header = new Header({
        title: 'Garage',
        backButton: {
            state: true,
            route: '/tab/account',
        },
    });
}
