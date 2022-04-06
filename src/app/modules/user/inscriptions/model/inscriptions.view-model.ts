import { Header } from 'src/app/components/header/model/header.model';

export class InscriptionsViewModel {
    header = new Header({
        title: 'Inscripciones',
        backButton: {
            state: true,
            route: '/tab/account',
        },
    });
}
