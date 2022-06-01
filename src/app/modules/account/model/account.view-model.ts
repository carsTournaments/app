import { Header } from '@components/header/model/header.model';
import { OptionItemI } from '@interfaces/option-item.interface';
import { User } from '@models';
import { SettingsApp } from '@models/settings.model';
import { UserGetResumeResponse } from '@services/api/user/user.responses';

export class AccountViewModel {
    header = new Header({
        title: 'Tu Cuenta',
    });
    options: OptionItemI[] = [
        {
            name: 'Mis datos',
            subtitle: '¿Hoy te apetece llamarte Manolo?',
            route: 'my-data',
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
