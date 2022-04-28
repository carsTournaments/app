import { Header } from 'src/app/components/header/model/header.model';
import { OptionItemI } from 'src/app/interfaces/option-item.interface';
import { User } from 'src/app/models';
import { UserGetResumeResponse } from 'src/app/services/api/user/user.responses';

export class DashboardViewModel {
    header = new Header({
        title: 'Tu Cuenta',
    });
    options: OptionItemI[] = [
        { name: 'Cambiar nombre', value: 'changeName' },
        { name: 'Cambiar contraseña', value: 'changePassword' },
        { name: 'Garaje', route: 'garage' },
        { name: 'Inscripciones', route: 'inscriptions' },
        { name: 'Me gustas', route: 'likes' },
        { name: 'Cerrar sesion', value: 'logout' },
    ];
    registerMode = false;
    user: User;
    resume: UserGetResumeResponse;
}
