import { Header } from '@components/header/model/header.model';
import { User } from '@models';

export class MyDataViewModel {
    header = new Header({
        title: '',
        backButton: {
            state: true,
            route: '/tab/account',
            default: true,
        },
    });
    user: User;
    countries: { id: string; name: string }[] = [];
    countryIdSelected = 'es';
}
