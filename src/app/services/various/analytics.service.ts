import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { Platform } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
    analyticsEnabled = true;

    constructor(private router: Router, private platform: Platform) {
        this.initFb();
        this.router.events
            .pipe(filter((e: RouterEvent) => e instanceof NavigationEnd))
            .subscribe((e: RouterEvent) => {
                this.setScreenName(e.url);
            });
    }

    async initFb(): Promise<void> {
        if (!this.platform.is('capacitor')) {
            FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
        }
    }

    setScreenName(screenName: string): void {
        FirebaseAnalytics.setScreenName({
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
        FirebaseAnalytics.setCollectionEnabled({
            enabled: this.analyticsEnabled,
        });
    }
}
