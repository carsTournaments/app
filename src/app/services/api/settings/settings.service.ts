import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SettingsAppDto } from './settings.dto';
import { SettingsAppI, SettingsCheckUpdateI } from './settings.response';
import { AdmobService, AlertService, StorageService } from '../..';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    url = `${environment.urlApi}/settings`;
    settings: SettingsAppI;
    constructor(
        private httpClient: HttpClient,
        public location: Location,
        private platform: Platform,
        private alertService: AlertService,
        private admobService: AdmobService,
        private storageService: StorageService
    ) {}

    async getSettingsDB(): Promise<void> {
        const data: SettingsAppDto = {};
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
                    this.setSettings(response);
                    this.checkUpdate(response);
                    this.checkStates(response);
                },
            });
    }

    setSettings(data: SettingsAppI): void {
        this.storageService.set('settings', data);
    }

    async getSettings(): Promise<SettingsAppI> {
        const settings = await this.storageService.get<SettingsAppI>(
            'settings'
        );
        if (settings) {
            this.settings = settings;
            return this.settings;
        } else {
            await this.getSettingsDB();
            this.getSettings();
        }
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
        if (data.state) {
            if (data.state.admob) {
                this.admobService.init();
            }
        }
    }
}
