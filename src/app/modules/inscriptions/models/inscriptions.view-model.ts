import { Header } from '@components/header/model/header.model';
import { NoItemsModel } from '@components/no-items/no-items.model';
import { Inscription } from '@models';

export class InscriptionsViewModel {
    id: string;
    header = new Header({
        title: 'Inscripciones',
        backButton: {
            state: true,
            route: '/tab/tournaments',
        },
    });
    noitems = new NoItemsModel({
        title: 'No hay inscripciones',
        subtitle: 'Todavia nadie se ha inscrito, ¿no quieres ser el primero?',
    });
    inscriptions: Inscription[] = [];
    loading = true;
    error = false;
}
