import { Header } from 'src/app/components/header/model/header.model';
import { OptionItemI } from 'src/app/interfaces/option-item.interface';

export class DashboardViewModel {
    header = new Header({
        title: 'Tu Cuenta',
    });
    options: OptionItemI[] = [
        { name: 'Mis Datos', icon: 'person', route: 'tab/account/profile' },
        { name: 'Garaje', icon: 'person', route: 'tab/account/garage' },
        {
            name: 'Inscripciones',
            icon: 'person',
            route: 'tab/account/inscriptions',
        },
        { name: 'Cerrar sesion', icon: 'person', value: 'logout' },
    ];
    registerMode = false;
}
