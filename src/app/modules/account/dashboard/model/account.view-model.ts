import { Header } from 'src/app/components/header/model/header.model';
import { OptionItemI } from 'src/app/interfaces/option-item.interface';
import { User } from 'src/app/models';
import { SettingsApp } from 'src/app/models/settings.model';
import { UserGetResumeResponse } from 'src/app/services/api/user/user.responses';

export class AccountViewModel {
    header = new Header({
        title: 'Tu Cuenta',
    });
    options: OptionItemI[] = [
        {
            name: 'Cambiar nombre',
            subtitle: '¿Tal vez hoy te apetece llamarte manolo?',
            value: 'changeName',
        },
        {
            name: 'Cambiar contraseña',
            subtitle: 'Si necesitas cambiar tu contraseña...',
            value: 'changePassword',
        },
        {
            name: 'Garaje',
            subtitle: 'Edita o añade nuevos coches a tu garage',
            route: 'garage',
        },
        {
            name: 'Inscripciones',
            subtitle: 'Comprueba los torneos en los que estas inscrito',
            route: 'inscriptions',
        },
        {
            name: 'Me gustas',
            subtitle: 'Comprueba tus me gustas recibidos o enviados',
            route: 'likes',
        },
        { name: 'Cerrar sesion', subtitle: '¿Nos abandonas?', value: 'logout' },
    ];
    registerMode = false;
    user: User;
    resume: UserGetResumeResponse;
    settings: SettingsApp;
    loading = true;
}
