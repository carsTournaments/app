import { Header } from 'src/app/components/header/model/header.model';

export class MyDataViewModel {
    header = new Header({
        title: 'Mis datos',
        backButton: {
            state: true,
            route: '/tab/account',
        },
    });
}