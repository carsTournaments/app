import { AppInfo } from '@capacitor/app';
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
  info: AppInfo;
}
