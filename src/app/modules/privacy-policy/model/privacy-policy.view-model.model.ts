import { Header } from '@components/header/model/header.model';
import { config } from '@config';

export class PrivacyPolicyViewModel {
    header = new Header({
        title: 'Politica de privacidad',
        backButton: {
            state: true,
            route: config.routes.account,
            default: true,
        },
    });
}
