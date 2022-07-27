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
  id: string;
  email: string;
  name?: string;
  displayName?: string;
  familyName: string;
  givenName: string;
  imageUrl: string;
  serverAuthCode: string;
  authentication: any;
}
