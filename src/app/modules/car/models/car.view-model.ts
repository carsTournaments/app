import { Header } from '@components/header/model/header.model';
import { Car, Inscription, Like, User, Vote } from '@models';

export class CarViewModel {
    id: string;
    header = new Header({
        title: 'Coches',
        backButton: {
            state: true,
            route: '/tab/cars',
        },
        rightButton: {
            state: true,
            icon: 'arrow-redo-outline',
        },
    });
    user: User;
    car: Car;
    isMyCar = false;
    image: string;
    loading = true;
    states = {
        likes: false,
        votes: false,
        inscriptions: false,
    };
    likes: Like[] = [];
    inscriptions: Inscription[] = [];
    votes: Vote[] = [];
    error = false;
    liked = false;
}