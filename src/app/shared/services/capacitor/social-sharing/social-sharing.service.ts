import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';
import { Platform } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class SocialSharingService {
  constructor(private platform: Platform) {}

  async share(text: string, url: string) {
    if (this.platform.is('capacitor')) {
      await Share.share({ text, url, dialogTitle: 'Compartir' });
    } else {
      if (navigator.share) {
        await navigator.share({ text, url });
      }
    }
  }
}
