export interface AuthLogInDto {
    email: string;
    password: string;
}

export interface AuthRegisterDto {
    email: string;
    name: string;
    password?: string;
}
