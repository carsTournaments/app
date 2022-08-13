export interface AuthLogInDto {
  email: string;
  password: string;
}

export interface AuthRegisterDto {
  email: string;
  name: string;
  password?: string;
}

export interface GoogleUserDto {
  displayName?: string;
  email?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  photoUrl?: string;
  providerId?: string;
  uid?: string;
}
