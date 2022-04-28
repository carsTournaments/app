import { Header } from 'src/app/components/header/model/header.model';
import { LikeGetAllReceivedForUserResponse } from 'src/app/services/api/like/like.response';

export class LikesViewModel {
    header = new Header({
        title: 'Me gustas',
        segments: {
            items: ['Recibidos', 'Enviados'],
            selected: 0,
        },
        backButton: {
            state: true,
            route: '/tab/account',
        },
    });
    likesReceived: LikeGetAllReceivedForUserResponse[] = [];
    likesSent: any[] = [];
    loading = true;
    error = false;
}
