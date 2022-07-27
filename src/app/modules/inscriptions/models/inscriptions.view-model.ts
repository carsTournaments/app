import { Header } from '@components/header/model/header.model';
import { NoItemsModel } from '@components/no-items/no-items.model';
import { config } from '@config';
import { Inscription } from '@models';

export class InscriptionsViewModel {
  id: string;
  header = new Header({
    title: 'Inscripciones',
    backButton: {
      state: true,
      route: config.routes.tournaments,
      default: true,
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
