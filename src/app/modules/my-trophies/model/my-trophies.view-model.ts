import { Header } from '@components/header/model/header.model';
import { NoItemsModel } from '@components/no-items/no-items.model';
import { config } from '@core/config';
import { WinnerGetAllUserWinnersI } from '@services/api/winner/winner.responses';

export class MyTournamentsWonViewModel {
  header = new Header({
    title: 'Mis trofeos',
    backButton: {
      state: true,
      route: config.routes.account,
      default: true,
    },
    segments: {
      selected: 0,
      items: ['Oro', 'Plata', 'Bronce'],
      state: true,
    },
  });
  items: WinnerGetAllUserWinnersI[] = [];
  noItems = new NoItemsModel({
    title: '¡Oye!',
    subtitle: '¡Todavia no has ganado ningun trofeo!',
    state: false,
  });
  loading = true;
  error = false;
}
