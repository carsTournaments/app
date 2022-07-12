import { Header } from '@components/header/model/header.model';
import { NoItemsModel } from '@components/no-items/no-items.model';
import { InscriptionGetAllForDriverI } from '@interfaces';
import { User } from '@models';

export class MyInscriptionsViewModel {
    header = new Header({
        title: 'Inscripciones',
        backButton: {
            state: true,
            route: '/tab/account',
        },
    });
    user: User;
    inscriptions: InscriptionGetAllForDriverI;
    loading = true;
    error = false;
    states = {
        todo: false,
        inProgress: true,
        completed: false,
    };
    noitems = new NoItemsModel({
        title: '',
        subtitle: '',
    });
}
