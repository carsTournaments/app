import { Header } from '@components/header/model/header.model';
import { Round } from '@models';

export class CalendarViewModel {
    header = new Header({ title: 'Calendario' });
    dateSelected = '';
    rounds: Round[] = [];
    loading = true;
}
