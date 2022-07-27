import { Car } from '@models';

export interface LikeGetAllReceivedForUserResponse {
  car: Car;
  likes: number;
  lastLike: string;
}
