import { Header } from '@components/header/model/header.model';
import { config } from '@core/config';
import { Image } from '@models';

export class MyGarageImagesViewModel {
  header = new Header({
    title: 'Imagenes',
    backButton: {
      state: true,
      route: config.routes.myGarage,
      default: true,
    },
  });
  id: string;
  images: Image[] = [];
  loading = true;
}
