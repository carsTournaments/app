import { Header } from 'src/app/components/header/model/header.model';
import { NoItemsModel } from 'src/app/components/no-items/no-items.model';
import { IdDto } from 'src/app/core/dtos/id.dto';
import { Car, User } from 'src/app/models';

export class GarageListViewModel {
    header = new Header({
        title: 'Garage',
        backButton: {
            state: true,
            route: '/tab/account',
        },
    });
    bodyCars: IdDto = { id: '' };
    user: User;
    cars: Car[];
    error = false;
    loading = true;
    noitems = new NoItemsModel({
        title: '¡No tienes ningun coche en tu garage!',
        subtitle:
            'Puedes usar el boton de abajo a la derecha para añadir tu primer coche.',
    });
}
