import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SettingsCheckUpdateDto } from './settings.dto';
import { SettingsCheckUpdateI } from './settings.response';
import { AlertService } from '../..';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    url = `${environment.urlApi}/settings`;
    constructor(
        private httpClient: HttpClient,
        public location: Location,
        private platform: Platform,
        private alertService: AlertService
    ) {}

    async checkUpdateApp() {
        if (this.platform.is('capacitor')) {
            const info = await App.getInfo();
            const version = info.version;
            const platform = this.platform.is('android') ? 'android' : 'ios';
            this.checkUpdateDB({ platform, version }).subscribe({
                next: (response) => {
                    if (response.mandatory) {
                        this.onMandatoryUpdate(response);
                    } else if (response.update) {
                        this.isAvailableUpdate(response);
                    }
                },
            });
        }
    }

    private checkUpdateDB(
        data: SettingsCheckUpdateDto
    ): Observable<SettingsCheckUpdateI> {
        return this.httpClient
            .post<SettingsCheckUpdateI>(`${this.url}/checkUpdate`, data)
            .pipe(take(1));
    }

    onMandatoryUpdate(data: SettingsCheckUpdateI) {
        this.alertService.presentAlertWithButtons(
            'Actualización obligatoria',
            'Es necesario actualizar la aplicación para poder continuar',
            [{ text: 'Ok', handler: () => this.goToMarket(data) }]
        );
    }

    isAvailableUpdate(data: SettingsCheckUpdateI) {
        this.alertService.presentAlertWithButtons(
            'Actualización disponible',
            '¿Quieres actualizar la aplicacion?',
            [
                { text: 'No', role: 'cancel' },
                { text: 'Si', handler: () => this.goToMarket(data) },
            ]
        );
    }

    async goToMarket(data: SettingsCheckUpdateI) {
        Browser.open({ url: data.urlMarket }).then(() => {
            App.exitApp();
        });
    }
}
