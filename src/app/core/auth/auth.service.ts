import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { LoginResponseI } from '@interfaces/login-response.interface';
import { StorageService } from '../../shared/services/ionic/storage.service';
import { map, share, switchMap, take, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { TokenService } from './token.service';
import { isEmptyObject } from './helpers';
import { AuthLogInDto, AuthRegisterDto } from './auth.dto';
import { NotificationsPushService, UserService } from '@services';
import { RegisterService } from './register.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private url = `${environment.urlApi}/auth`;
    private user$ = new BehaviorSubject({});
    private change$ = this.tokenService
        .change()
        .pipe(switchMap(() => this.assignUser()));
    constructor(
        private httpClient: HttpClient,
        private storageService: StorageService,
        private loginService: LoginService,
        private registerService: RegisterService,
        private tokenService: TokenService,
        private userService: UserService,
        private notificationsPushService: NotificationsPushService
    ) {}

    // login(data: AuthLogInDto): Observable<LoginResponseI> {
    //     return this.httpClient
    //         .post<LoginResponseI>(`${this.url}/login`, data)
    //         .pipe(take(1));
    // }

    // logout(): void {
    //     localStorage.clear();
    //     this.storageService.remove('user');
    // }

    // register(data: AuthRegisterDto): Observable<LoginResponseI> {
    //     return this.httpClient
    //         .post<LoginResponseI>(`${this.url}/register`, data)
    //         .pipe(take(1));
    // }

    // setToken(token: string) {
    //     localStorage.setItem('token', token);
    // }

    // getToken(): string {
    //     return localStorage.getItem('token') as string;
    // }

    // setUser(user: User): void {
    //     this.storageService.set('user', user);
    // }

    // getUser(): Promise<User> {
    //     return this.storageService.get<User>('user');
    // }

    // isAuthenticated(): boolean {
    //     const token = this.getToken();
    //     if (token !== null) {
    //         return true;
    //     }
    //     return false;
    // }

    init() {
        return new Promise<void>((resolve) =>
            this.change$.subscribe(() => resolve())
        );
    }

    change() {
        return this.change$;
    }

    check(): boolean {
        return this.tokenService.valid();
    }

    login(data: AuthLogInDto): Observable<boolean> {
        return this.loginService.login(data).pipe(
            tap((item: LoginResponseI) => {
                this.tokenService.set(item.token);
                this.userService.set(item.user);
                // TODO: Registrar FCM
                this.notificationsPushService.registerFCM(item.user ?? null);
            }),
            map(() => this.check())
        );
    }

    register(data: AuthRegisterDto): Observable<boolean> {
        return this.registerService.register(data).pipe(
            tap((item: LoginResponseI) => {
                // TODO: Registrar Usuario
                this.tokenService.set(item.token);
                this.notificationsPushService.registerFCM(item.user ?? null);
            }),
            map(() => this.check())
        );
    }

    logout(): void {
        this.userService.clear();
        this.tokenService.clear();
        !this.check();
    }

    user(): Observable<any> {
        return this.user$.pipe(share());
    }

    // menu(): Observable<Menu[] | never[]> {
    //     return iif(() => this.check(), this.loginService.menu(), of([]));
    // }

    private assignUser(): any {
        if (!this.check()) {
            return of({}).pipe(
                tap((user) => this.user$.next(user)),
                share()
            );
        }
        if (!isEmptyObject(this.user$.getValue())) {
            return of(this.user$.getValue()).pipe(share());
        }
        return this.loginService.me().pipe(
            tap((user) => this.user$.next(user)),
            share()
        );
    }
}
