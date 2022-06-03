import { LoginResponseI } from '@interfaces/login-response.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthLogInDto, GoogleUserDto } from './auth.dto';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private path = `${environment.urlApi}/auth`;
    constructor(protected http: HttpClient) {}

    login(data: AuthLogInDto) {
        return this.http.post<LoginResponseI>(`${this.path}/login`, data);
    }

    loginGoogle(data: GoogleUserDto) {
        return this.http.post<LoginResponseI>(`${this.path}/loginGoogle`, data);
    }
}
