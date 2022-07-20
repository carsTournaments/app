import { Header } from '@components/header/model/header.model';
import { NoItemsModel } from '@components/no-items/no-items.model';
import { IdDto } from '@core/dtos/id.dto';
import { Car, User } from '@models';
import { config } from '@config';

export class MyGarageListViewModel {
    header = new Header({
        title: 'Garaje',
        backButton: {
            state: true,
            route: config.routes.account,
            default: true,
        },
    });
    bodyCars: IdDto = { id: '' };
    user: User;
    cars: Car[];
    error = false;
    loading = true;
    noitems = new NoItemsModel({
        title: '¡No tienes ningun coche en tu garaje!',
        subtitle:
            'Puedes usar el boton de abajo a la derecha para añadir tu primer coche.',
    });
}
