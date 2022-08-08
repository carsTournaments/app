import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { FirebaseAnalytics } from '@capacitor-firebase/analytics';
import { Platform } from '@ionic/angular';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  analyticsEnabled = true;

  constructor(private router: Router, private platform: Platform) {}

  start() {
    this.router.events
      .pipe(filter((e: RouterEvent) => e instanceof NavigationEnd))
      .subscribe((e: RouterEvent) => {
        this.setScreenName(e.url);
      });
  }

  setScreenName(screenName: string): void {
    FirebaseAnalytics.setCurrentScreen({
      screenName,
    });
  }

  setUser(userId: string): void {
    FirebaseAnalytics.setUserId({
      userId,
    });
  }

  logEvent(name: string, params = {}): void {
    FirebaseAnalytics.logEvent({
      name,
      params,
    });
  }

  toggleAnalytics(): void {
    this.analyticsEnabled = !this.analyticsEnabled;
    FirebaseAnalytics.setEnabled({
      enabled: this.analyticsEnabled,
    });
  }
}
