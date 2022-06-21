import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  PushNotifications,
  PushNotificationSchema,
  ActionPerformed,
  Token,
} from '@capacitor/push-notifications';
import { Platform } from '@ionic/angular';
import { User } from '@models';
import { environment } from '@env/environment';
import { AlertService } from '../../ionic/alert-ionic.service';
import { StorageService } from '../../ionic/storage-ionic.service';
import { Browser } from '@capacitor/browser';
@Injectable({ providedIn: 'root' })
export class NotificationsPushService {
  url = `${environment.urlApi}/notifications`;
  pushNotificationToken: any; // I save the token to database because i need it in my backend code.

  constructor(
    private platform: Platform,
    private storageService: StorageService,
    private alertService: AlertService,
    private httpClient: HttpClient,
    private router: Router
  ) { }

  async registerFCM(user?: User) {
    try {
      if (this.platform.is('capacitor')) {
        this.requestPermissions();
        this.addListenerRegistration(user);
        this.addEventListenerPushNotificationReceived();
      }
    } catch (error) {
      console.error(error);
    }
  }

  private requestPermissions() {
    PushNotifications.requestPermissions().then((permission) => {
      if (permission.receive) {
        PushNotifications.register();
      } else {
        // No permission for push granted
      }
    });
  }

  private addListenerRegistration(user: User) {
    PushNotifications.addListener('registration', async (token: Token) => {
      if (user && user.fcm !== token.value) {
        const userForStorage = await this.updateFCMForUser(
          user._id,
          token.value
        );
        this.storageService.set('user', userForStorage);
      }
      this.pushNotificationToken = JSON.stringify(token.value);
    });
  }

  private addEventListenerPushNotificationReceived() {
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification: PushNotificationSchema) => {
        const alert = await this.alertService.presentAlertWithButtons(
          notification.title,
          notification.body,
          [
            {
              text: notification.data.titleButton,
              handler: () =>this.onPushNotificationClick(notification),
            },
          ]
        );
        await alert.present();
      }
    );
  }

  private onPushNotificationClick(notification: PushNotificationSchema) {
    if (notification.data.link && notification.data.linkType) {
      if (notification.data.linkType === 'external') {
        Browser.open({ url: notification.data.link });
      } else {
        this.router.navigate([notification.data.link]);
      }
      if (notification.data && notification.data.id) {
        this.updateOpenedNotification(notification.data.id);
      }
    }
  }

  private updateOpenedNotification(id: string) {
    const url = `${this.url}/updateOpened/${id}`;
    return this.httpClient.put(url, null);
  }

  updateFCMForUser(userId: string, token: string) {
    const url = `${this.url}/updateFCMForUser`;
    return this.httpClient.post(url, { id: userId, token }).toPromise();
  }
}
