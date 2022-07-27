import { Injectable } from '@angular/core';
import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import { environment } from '@env/environment';
import { Platform } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  constructor(private platform: Platform) {}

  init(): void {
    if (!this.platform.is('capacitor')) {
      GoogleAuth.initialize({
        clientId: environment.clientId,
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
      });
    }
  }

  login(): Promise<User> {
    return GoogleAuth.signIn();
  }

  logout(): Promise<void> {
    return GoogleAuth.signOut();
  }
}
