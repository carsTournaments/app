import { Header } from '@components/header/model/header.model';
import { config } from '@config';
import { User } from '@models';

export class MyDataViewModel {
  header = new Header({
    title: '',
    backButton: {
      state: true,
      route: config.routes.account,
      default: true,
    },
  });
  user: User;
  countries: { id: string; name: string }[] = [];
  countryIdSelected = 'es';
}
