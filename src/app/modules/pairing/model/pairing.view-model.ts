import { Header } from '@components/header/model/header.model';
import { Image, Pairing, User, Vote } from '@models';

export class PairingViewModel {
    id: string;
    backButtonRoute = '';
    rightButton: {
        state: true;
        icon: 'arrow-redo-outline';
    };
    header = new Header({
        title: '',
        backButton: {
            state: true,
            route: '/tab/cars',
            default: true,
        },
        rightButton: {
            state: true,
            icon: 'arrow-redo-outline',
        },
    });
    user: User;
    reportState = false;
    pairing: Pairing;
    totalHeight = 500;
    image1: Image;
    image2: Image;
    voteBody = new Vote();
    voted = false;
    votedNow = false;
    loading = true;
    error = false;
}
