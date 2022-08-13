import { AppUpdateInfo } from '@capawesome/capacitor-app-update';
import { Header } from '@components/header/model/header.model';
import { config } from '@config';

export class AboutViewModel {
  header = new Header({
    title: 'Acerca de',
    backButton: {
      state: true,
      route: config.routes.account,
      default: true,
    },
  });
  info: AppUpdateInfo;
  stateButtonsUpdate = false;
}
