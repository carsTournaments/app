import { Header } from '@components/header/model/header.model';
import { OptionItemI } from '@interfaces';
import { User } from '@models';
import { SettingsApp } from '@models/settings.model';
import { UserGetResumeResponse } from '@services/api/user/user.responses';

export class AccountViewModel {
  header = new Header({
    title: '',
  });
  options: OptionItemI[] = [];
  registerMode = false;
  user: User;
  resume: UserGetResumeResponse;
  settings: SettingsApp;
  itemsOrder = [
    { name: 'Carreras', value: 'pairings' },
    { name: 'Victorias', value: 'pairingsWinners' },
    { name: 'Votos', value: 'votes' },
    { name: 'Inscripciones', value: 'inscriptions' },
    { name: 'Me Gustas', value: 'likes' },
    { name: 'Oro/Plata/Bronce', value: 'tournamentsWinners' },
  ];
  loading = true;
}
