import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SettingsAppDto } from './settings.dto';
import { SettingsAppI, SettingsCheckUpdateI } from './settings.response';
import { AdmobService, AlertService } from '../..';
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
        private alertService: AlertService,
        private admobService: AdmobService
    ) {}

    async getSettingsForApp(): Promise<void> {
        let data: SettingsAppDto = {};
        if (this.platform.is('capacitor')) {
            const info = await App.getInfo();
            data.version = info.version;
            data.platform = this.platform.is('android') ? 'android' : 'ios';
        }
        this.httpClient
            .post<SettingsAppI>(`${this.url}/getSettingsForApp`, data)
            .pipe(take(1))
            .subscribe({
                next: (response: SettingsAppI) => {
                    this.checkUpdate(response);
                    this.checkStates(response);
                },
            });
    }

    private checkUpdate(data: SettingsAppI): void {
        if (data.isNeedUpdate) {
            if (data.isNeedUpdate.mandatory) {
                this.onMandatoryUpdate(data.isNeedUpdate);
            } else if (data.isNeedUpdate.update) {
                this.isAvailableUpdate(data.isNeedUpdate);
            }
        }
    }

    private onMandatoryUpdate(data: SettingsCheckUpdateI) {
        this.alertService.presentAlertWithButtons(
            'Actualización obligatoria',
            'Es necesario actualizar la aplicación para poder continuar',
            [{ text: 'Ok', handler: () => this.goToMarket(data) }]
        );
    }

    private isAvailableUpdate(data: SettingsCheckUpdateI): void {
        this.alertService.presentAlertWithButtons(
            'Actualización disponible',
            '¿Quieres actualizar la aplicacion?',
            [
                { text: 'No', role: 'cancel' },
                { text: 'Si', handler: () => this.goToMarket(data) },
            ]
        );
    }

    private async goToMarket(data: SettingsCheckUpdateI): Promise<void> {
        Browser.open({ url: data.urlMarket }).then(() => {
            App.exitApp();
        });
    }

    private checkStates(data: SettingsAppI): void {
        if (data.status) {
            if (data.status.admob) {
                this.admobService.init();
            }
        }
    }
}
