import { User } from '../models/user.model';

export interface LoginResponseI {
    user: User;
    token: string;
}
