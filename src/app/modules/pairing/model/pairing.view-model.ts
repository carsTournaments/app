import { Header } from 'src/app/components/header/model/header.model';
import { Pairing } from 'src/app/models';

export class PairingViewModel {
    id: string;
    header = new Header({
        title: 'Emparejamiento',
        backButton: {
            state: true,
            route: '',
        },
    });
    pairing: Pairing;
    totalHeight = 500;
}
