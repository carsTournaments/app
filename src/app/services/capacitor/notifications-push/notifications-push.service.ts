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
import { User } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { AlertService } from '../../ionic/alert.service';
import { StorageService } from '../../ionic/storage.service';

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
    ) {}

    async registerFCM(user?: User) {
        try {
            if (this.platform.is('capacitor')) {
                this.requestPermissions();
                this.addListenerRegistration(user);
                this.addEventListenerPushNotificationReceived();
                this.addListenerPushNotificationActionPerformed();
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
                const data = notification;

                const alert = await this.alertService.presentAlertWithButtons(
                    JSON.stringify(notification.title).substring(
                        1,
                        JSON.stringify(notification.title).length - 1
                    ),
                    JSON.stringify(notification.body).substring(
                        1,
                        JSON.stringify(notification.body).length - 1
                    ),
                    [
                        {
                            text: 'OK',
                            handler: () => {
                                // if (data.data.url != '' && data.data.url != undefined) {
                                //     const browser = this.iab.create(data.data.url, '_blank', { location: 'no' });
                                // }
                            },
                        },
                    ]
                );
                await alert.present();
            }
        );
    }

    private addListenerPushNotificationActionPerformed() {
        PushNotifications.addListener(
            'pushNotificationActionPerformed',
            async (notification: ActionPerformed) => {
                const data = notification.notification.data;
                console.log(
                    'Action performed: ' +
                        JSON.stringify(notification.notification)
                );

                if (data.url) {
                    if (data.url != '' && data.url != undefined) {
                        // const browser = this.iab.create(data.url, '_blank', { location: 'no' });
                    }
                }
            }
        );
    }

    openNotification(notification: PushNotificationSchema) {
        const link =
            notification.data && notification.data.link
                ? notification.data.link
                : null;
        const id =
            notification.data && notification.data.id
                ? notification.data.id
                : null;
        const nameButton =
            notification.data && notification.data.textButton
                ? notification.data.textButton
                : 'OK';
        if (link) {
            this.alertService.presentAlertWithButtons(
                notification.data.title,
                notification.data.message,
                [
                    {
                        text: nameButton,
                        handler: () => {
                            this.router.navigate([link]);
                            if (id) {
                                this.updateOpenedNotification(id);
                            }
                        },
                    },
                ],
                '',
                false
            );
        } else {
            this.alertService.presentAlert(
                notification.data.title,
                notification.data.message,
                '',
                false
            );
            if (id) {
                this.updateOpenedNotification(id);
            }
        }
    }

    updateOpenedNotification(id: string) {
        const url = `${this.url}/updateOpened/${id}`;
        return this.httpClient.put(url, null);
    }

    updateFCMForUser(userId: string, token: string) {
        const url = `${this.url}/updateFCMForUser`;
        return this.httpClient.post(url, { id: userId, token }).toPromise();
    }
}
