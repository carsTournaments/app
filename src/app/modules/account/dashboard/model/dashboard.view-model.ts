import { Header } from 'src/app/components/header/model/header.model';
import { OptionItemI } from 'src/app/interfaces/option-item.interface';

export class DashboardViewModel {
    header = new Header({
        title: 'Tu Cuenta',
    });
    options: OptionItemI[] = [
        { name: 'Cambiar nombre', icon: 'person', value: 'changeName' },
        { name: 'Cambiar contraseña', icon: 'person', value: 'changePassword' },
        { name: 'Garaje', icon: 'person', route: 'garage' },
        {
            name: 'Inscripciones',
            icon: 'person',
            route: 'inscriptions',
        },
        { name: 'Cerrar sesion', icon: 'person', value: 'logout' },
    ];
    registerMode = false;
}
