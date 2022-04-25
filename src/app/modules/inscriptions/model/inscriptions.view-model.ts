import { Header } from 'src/app/components/header/model/header.model';
import { Car, Tournament, User } from 'src/app/models';

export class InscriptionsViewModel {
    header = new Header({
        title: 'Inscripciones',
        segments: {
            items: [''],
            selected: 0,
        },
        backButton: {
            state: true,
            route: '/tab/account',
        },
    });
    user: User;
    inscriptions: {
        todo: { car: Car; tournament: Tournament }[];
        inProgress: { car: Car; tournament: Tournament }[];
        completed: { car: Car; tournament: Tournament }[];
    };
    loading = true;
    error = false;
}
