import { Image, Pairing, User, Vote } from '@models';

export class PairingViewModel {
    id: string;
    backButtonRoute = '';
    rightButton = {
        state: true,
        icon: 'alert-circle-outline',
    };
    user: User;
    pairing: Pairing;
    totalHeight = 500;
    image1: Image;
    image2: Image;
    voteBody = new Vote();
    voted = false;
    loading = true;
    error = false;
}
