import { Header } from '@components/header/model/header.model';
import { Round, Tournament } from '@models';

export class CalendarViewModel {
    header = new Header({ title: 'Calendario' });
    dateSelected = '';
    rounds: Round[] = [];
    tournaments: Tournament[] = [];
    loading = true;
}
