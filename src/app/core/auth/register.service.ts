import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRegisterDto } from './auth.dto';
import { LoginResponseI } from '@interfaces/login-response.interface';

@Injectable({
    providedIn: 'root',
})
export class RegisterService {
    constructor(protected http: HttpClient) {}

    register(data: AuthRegisterDto) {
        return this.http.post<LoginResponseI>('/auth/register', data);
    }
}
