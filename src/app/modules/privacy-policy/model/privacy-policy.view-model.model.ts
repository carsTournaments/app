import { Header } from 'src/app/components/header/model/header.model';

export class PrivacyPolicyViewModel {
    header = new Header({
        title: 'Politica de privacidad',
        backButton: {
            state: true,
            route: 'tab/tournaments',
        },
    });
}
