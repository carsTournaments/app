import { Injectable } from '@angular/core';
import {
    AdMob,
    BannerAdOptions,
    BannerAdSize,
    BannerAdPosition,
    AdOptions,
    RewardAdOptions,
} from '@capacitor-community/admob';

@Injectable({ providedIn: 'root' })
export class AdmobService {
    async init(): Promise<void> {
        const { status } = await AdMob.trackingAuthorizationStatus();
        if (status === 'notDetermined') {
            /**
             * If you want to explain TrackingAuthorization before showing the iOS dialog,
             * you can show the modal here.
             * ex)
             * const modal = await this.modalCtrl.create({
             *   component: RequestTrackingPage,
             * });
             * await modal.present();
             * await modal.onDidDismiss();  // Wait for close modal
             **/
        }

        AdMob.initialize({
            requestTrackingAuthorization: true,
            initializeForTesting: false,
        });
    }

    async showBanner(): Promise<void> {
        const options: BannerAdOptions = {
            adId: 'ca-app-pub-1868668305627051/4974113551',
            adSize: BannerAdSize.MEDIUM_RECTANGLE,
            position: BannerAdPosition.CENTER,
            margin: 0,
            isTesting: false,
        };
        AdMob.showBanner(options);
    }

    async showInterstitial(): Promise<void> {
        const options: AdOptions = {
            adId: 'ca-app-pub-1868668305627051/2406277079',
            isTesting: false,
        };
        await AdMob.prepareInterstitial(options);
        await AdMob.showInterstitial();
    }

    async showRewardVideo(): Promise<void> {
        const options: RewardAdOptions = {
            adId: 'ca-app-pub-1868668305627051/1719310546',
        };
        await AdMob.prepareRewardVideoAd(options);
        await AdMob.showRewardVideoAd();
    }

    hideBanner() {
        AdMob.hideBanner();
    }
}
