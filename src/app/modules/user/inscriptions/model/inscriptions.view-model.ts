import { Header } from 'src/app/components/header/model/header.model';
import { Inscription, User } from 'src/app/models';

export class InscriptionsViewModel {
    header = new Header({
        title: 'Inscripciones',
        backButton: {
            state: true,
            route: '/tab/account',
        },
    });
    user: User;
    inscriptions: Inscription[] = [];
}
