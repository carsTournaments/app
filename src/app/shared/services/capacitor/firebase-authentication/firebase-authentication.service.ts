import { Injectable, NgZone } from '@angular/core';
// import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { environment } from '@env/environment';
import { Platform } from '@ionic/angular';
import {
  AuthStateChange,
  FirebaseAuthentication,
} from '@capacitor-firebase/authentication';
import { initializeApp } from '@firebase/app';
import { Observable, Subject } from 'rxjs';
import { GoogleUserDto } from '@core/auth/auth.dto';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthenticationService {
  private readonly authStateSubj = new Subject<AuthStateChange>();

  constructor(
    private readonly platform: Platform,
    private readonly ngZone: NgZone
  ) {
    FirebaseAuthentication.removeAllListeners().then(() => {
      FirebaseAuthentication.addListener('authStateChange', (change) => {
        this.ngZone.run(() => {
          this.authStateSubj.next(change);
        });
      });
    });
  }

  public get authState$(): Observable<AuthStateChange> {
    return this.authStateSubj.asObservable();
  }

  async init(): Promise<void> {
    if (this.platform.is('capacitor')) {
      return;
    }
    initializeApp(environment.firebaseConfig);
  }

  public async getCurrentUser(): Promise<any | null> {
    const result = await FirebaseAuthentication.getCurrentUser();
    return result.user;
  }

  async login(): Promise<GoogleUserDto> {
    const result = await FirebaseAuthentication.signInWithGoogle();
    return result.user;
  }

  public async signInWithApple(): Promise<void> {
    await FirebaseAuthentication.signInWithApple();
  }

  public async signInWithGoogle(): Promise<void> {
    await FirebaseAuthentication.signInWithGoogle();
  }

  async logout(): Promise<void> {
    return await FirebaseAuthentication.signOut();
    // return GoogleAuth.signOut();
  }
}
