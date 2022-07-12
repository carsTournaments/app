import { NoItemsModel } from '@components/no-items/no-items.model';
import { Header } from '@components/header/model/header.model';
import { Round, Tournament } from '@models';

export class CalendarViewModel {
    header = new Header({ title: 'Calendario' });
    dates: string[] = [];
    dateSelected = '';
    rounds: Round[] = [];
    tournaments: Tournament[] = [];
    loading = true;
    noDays = false;
    noItems = new NoItemsModel({
        title: '¡Vaya!',
        subtitle: '¡No tenemos ningun torneo proximamente!',
    });
}
