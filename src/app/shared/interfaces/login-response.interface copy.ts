import { User } from '@models/user.model';

export interface LoginResponseI {
    item: User;
    token: string;
}
