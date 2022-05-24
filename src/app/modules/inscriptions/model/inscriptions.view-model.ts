import { Header } from 'src/app/components/header/model/header.model';
import { NoItemsModel } from 'src/app/components/no-items/no-items.model';
import { InscriptionGetAllForDriverI } from 'src/app/interfaces/inscription.interface';
import { User } from 'src/app/models';

export class InscriptionsViewModel {
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
        title: '¡Vaya!',
        subtitle: 'Todavia no te has inscrito a ningun torneo',
    });
}
