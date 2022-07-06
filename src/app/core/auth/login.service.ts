import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthLogInDto, GoogleUserDto } from './auth.dto';
import { environment } from '@env/environment';
import { LoginGoogleResponseI, LoginOrRegisterResponseI } from '@interfaces';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    private path = `${environment.urlApi}/auth`;
    constructor(protected http: HttpClient) {}

    login(data: AuthLogInDto): Observable<LoginOrRegisterResponseI> {
        return this.http.post<LoginOrRegisterResponseI>(
            `${this.path}/login`,
            data
        );
    }

    loginGoogle(data: GoogleUserDto): Observable<LoginGoogleResponseI> {
        return this.http.post<LoginGoogleResponseI>(
            `${this.path}/loginGoogle`,
            data
        );
    }
}
