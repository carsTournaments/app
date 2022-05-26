import { LoginResponseI } from '@interfaces/login-response.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@models';
import { AuthLogInDto } from './auth.dto';
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

    logout() {
        return this.http.post<any>('/auth/logout', {});
    }

    me() {
        return this.http.post<User>('/auth/me', {});
    }
}
