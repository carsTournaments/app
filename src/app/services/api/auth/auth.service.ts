import { AuthLogInDto, AuthRegisterDto } from './auth.dto';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponseI } from 'src/app/interfaces/login-response.interface';
import { StorageService } from '../../ionic/storage.service';
import { User } from 'src/app/models/user.model';
import { take } from 'rxjs/internal/operators/take';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private url = `${environment.urlApi}/auth`;

    constructor(
        private httpClient: HttpClient,
        private storageService: StorageService
    ) {}

    login(data: AuthLogInDto): Observable<LoginResponseI> {
        return this.httpClient
            .post<LoginResponseI>(`${this.url}/login`, data)
            .pipe(take(1));
    }

    logout(): void {
        localStorage.clear();
        this.storageService.clear();
    }

    register(data: AuthRegisterDto): Observable<LoginResponseI> {
        return this.httpClient
            .post<LoginResponseI>(`${this.url}/register`, data)
            .pipe(take(1));
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    setUser(user: User): void {
        this.storageService.set('user', user);
    }

    getUser(): Promise<User> {
        return this.storageService.get<User>('user');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (token !== null) {
            return true;
        }
        return false;
    }
}
