import { Header } from '@components/header/model/header.model';
import { NoItemsModel } from '@components/no-items/no-items.model';
import { Like, User } from '@models';
import { LikeGetAllReceivedForUserResponse } from '@services/api/like/like.response';

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
    user: User;
    likesReceived: LikeGetAllReceivedForUserResponse[] = [];
    likesSent: Like[] = [];
    loading = true;
    error = false;
    noitemsReceived = new NoItemsModel({
        title: '¡Aqui no hay nada que ver!',
        subtitle: 'No has recibido ningún me gusta',
    });
    noitemsSent = new NoItemsModel({
        title: '¡Vaya!',
        subtitle: 'No has enviado ningún me gusta',
    });
}
