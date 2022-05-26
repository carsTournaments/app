import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginResponseI } from '@interfaces/login-response.interface';
import { map, share, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { TokenService } from './token.service';
import { AuthLogInDto, AuthRegisterDto } from './auth.dto';
import { NotificationsPushService, UserService } from '@services';
import { RegisterService } from './register.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private user$ = new BehaviorSubject({});
    constructor(
        private loginService: LoginService,
        private registerService: RegisterService,
        private tokenService: TokenService,
        private userService: UserService,
        private notificationsPushService: NotificationsPushService
    ) {}

    check(): boolean {
        return this.tokenService.valid();
    }

    login(data: AuthLogInDto): Observable<boolean> {
        return this.loginService.login(data).pipe(
            tap((item: LoginResponseI) => {
                this.tokenService.set(item.token);
                this.userService.set(item.user);
                this.notificationsPushService.registerFCM(item.user ?? null);
            }),
            map(() => this.check())
        );
    }

    register(data: AuthRegisterDto): Observable<boolean> {
        return this.registerService.register(data).pipe(
            tap((item: LoginResponseI) => {
                this.userService.set(item.user);
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
}
