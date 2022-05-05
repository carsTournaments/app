import { Injectable } from '@angular/core';
import {
    AdMob,
    BannerAdOptions,
    BannerAdSize,
    BannerAdPosition,
    BannerAdPluginEvents,
    AdMobBannerSize,
    AdOptions,
    AdLoadInfo,
    InterstitialAdPluginEvents,
    RewardAdOptions,
} from '@capacitor-community/admob';

@Injectable({ providedIn: 'root' })
export class AdmobService {
    constructor() {}

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
            // npa: true
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
        // AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
        //     // Subscribe prepared rewardVideo
        // });

        // AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem: AdMobRewardItem) => {
        //     // Subscribe user rewarded
        //     console.log(rewardItem);
        // });

        const options: RewardAdOptions = {
            adId: 'ca-app-pub-1868668305627051/1719310546',
            // isTesting: true
            // npa: true
            // ssv: {
            //   userId: "A user ID to send to your SSV"
            //   customData: JSON.stringify({ ...MyCustomData })
            //}
        };
        await AdMob.prepareRewardVideoAd(options);
        const rewardItem = await AdMob.showRewardVideoAd();
    }

    hideBanner() {
        AdMob.hideBanner();
    }
}
