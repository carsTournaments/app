import { Header } from 'src/app/components/header/model/header.model';
import { Pairing, Vote } from 'src/app/models';

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
    votes: {
        car1: { votes: number; percentage: number };
        car2: { votes: number; percentage: number };
    };
    voted: boolean = false;
    voteBody = new Vote();
}
