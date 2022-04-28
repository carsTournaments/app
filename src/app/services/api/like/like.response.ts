import { Car } from 'src/app/models';

export interface LikeGetAllReceivedForUserResponse {
    car: Car;
    likes: number;
    lastLike: string;
}
