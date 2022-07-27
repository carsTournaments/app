import { Header } from '@components/header/model/header.model';
import { NoItemsModel } from '@components/no-items/no-items.model';
import { Like, User } from '@models';
import { LikeGetAllReceivedForUserResponse } from '@services/api/like/like.response';
import { config } from '@config';

export class MyLikesViewModel {
  header = new Header({
    title: '',
    segments: {
      items: ['', ''],
      selected: 0,
    },
    backButton: {
      state: true,
      route: config.routes.account,
      default: true,
    },
  });
  user: User;
  likesReceived: LikeGetAllReceivedForUserResponse[] = [];
  likesSent: Like[] = [];
  loading = true;
  error = false;
  noitemsReceived = new NoItemsModel({
    title: '',
    subtitle: '',
  });
  noitemsSent = new NoItemsModel({
    title: '',
    subtitle: '',
  });
}
