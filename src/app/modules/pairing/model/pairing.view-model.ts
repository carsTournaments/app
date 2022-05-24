import { Header } from '@components/header/model/header.model';
import { Image, Pairing, User, Vote } from '@models';

export class PairingViewModel {
    id: string;
    header = new Header({
        title: 'Emparejamiento',
        backButton: {
            state: true,
            route: '',
        },
    });
    user: User;
    pairing: Pairing;
    totalHeight = 500;
    votes: {
        car1: { votes: number; percentage: number };
        car2: { votes: number; percentage: number };
    };
    voted = false;
    voteBody = new Vote();
    image1: Image;
    image2: Image;
    loading = true;
    error = false;
}
