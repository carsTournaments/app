import { User } from '@models';

export interface LoginOrRegisterResponseI {
  user: User;
  token: string;
}

export interface LoginGoogleResponseI {
  user: User;
  token: string;
  new: boolean;
}
