import { Header } from '@components/header/model/header.model';

export class PrivacyPolicyViewModel {
    header = new Header({
        title: 'Politica de privacidad',
        backButton: {
            state: true,
            route: 'tab/tournaments',
        },
    });
}
