import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRegisterDto } from './auth.dto';
import { LoginResponseI } from '@interfaces';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    private path = `${environment.urlApi}/auth`;
    constructor(protected http: HttpClient) {}

    register(data: AuthRegisterDto) {
        return this.http.post<LoginResponseI>(`${this.path}/register`, data);
    }
}
