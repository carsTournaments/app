import { Header } from 'src/app/components/header/model/header.model';
import { NoItemsModel } from 'src/app/components/no-items/no-items.model';
import { Like, User } from 'src/app/models';
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
