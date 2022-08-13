import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginGoogleResponseI, LoginOrRegisterResponseI } from '@interfaces';
import { map, share, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import { TokenService } from './token.service';
import { AuthLogInDto, AuthRegisterDto, GoogleUserDto } from './auth.dto';
import {
  FirebaseAuthenticationService,
  NotificationsPushService,
  UserService,
} from '@services';
import { RegisterService } from './register.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject({});
  constructor(
    private loginService: LoginService,
    private registerService: RegisterService,
    private tokenService: TokenService,
    private userService: UserService,
    private notificationsPushService: NotificationsPushService,
    private firebaseAuthenticationService: FirebaseAuthenticationService
  ) {}

  check(): boolean {
    return this.tokenService.valid();
  }

  login(data: AuthLogInDto): Observable<boolean> {
    return this.loginService.login(data).pipe(
      tap((item: LoginOrRegisterResponseI) =>
        this.onLoginOrRegisterSuccess(item)
      ),
      map(() => this.check())
    );
  }

  register(data: AuthRegisterDto): Observable<boolean> {
    return this.registerService.register(data).pipe(
      tap((item: LoginOrRegisterResponseI) =>
        this.onLoginOrRegisterSuccess(item)
      ),
      map(() => this.check())
    );
  }

  async loginGoogle(): Promise<Observable<boolean>> {
    try {
      const user: GoogleUserDto =
        await this.firebaseAuthenticationService.login();
      return this.loginService.loginGoogle(user).pipe(
        tap((response: LoginGoogleResponseI) => {
          this.onLoginOrRegisterSuccess(response);
          this.check();
        }),
        map((response) => response.new)
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }

  onLoginOrRegisterSuccess(
    item: LoginOrRegisterResponseI | LoginGoogleResponseI
  ): void {
    this.userService.set(item.user);
    this.tokenService.set(item.token);
    this.notificationsPushService.registerFCM(item.user ?? null);
  }

  logout(): void {
    this.userService.clear();
    this.tokenService.clear();
  }

  user(): Observable<any> {
    return this.user$.pipe(share());
  }
}
