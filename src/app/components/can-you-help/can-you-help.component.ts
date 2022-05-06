import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AdmobService, SettingsService } from 'src/app/services';

@Component({
    selector: 'can-you-help',
    templateUrl: 'can-you-help.component.html',
})
export class CanYouHelpComponent implements OnInit {
    state = false;
    noClick = false;
    constructor(
        private settingsService: SettingsService,
        private admobService: AdmobService,
        private platform: Platform
    ) {}

    ngOnInit() {
        this.checkShowOrHidden();
    }

    async checkShowOrHidden() {
        if (this.platform.is('capacitor')) {
            const settings = await this.settingsService.getSettings();
            if (settings.state) {
                this.state = settings.state.admob;
            }
        }
    }

    clickToHelp() {
        if (!this.noClick) {
            this.admobService.showInterstitial();
            this.antiClick();
        }
    }

    antiClick() {
        this.noClick = true;
        setTimeout(() => {
            this.noClick = false;
        }, 3000);
    }
}
