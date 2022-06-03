import { Component, OnInit } from '@angular/core';
import { TogglesService } from '@core/toggles/toggles.service';
import { Platform } from '@ionic/angular';
import { AdmobService } from '@services';

@Component({
    selector: 'can-you-help',
    templateUrl: 'can-you-help.component.html',
})
export class CanYouHelpComponent implements OnInit {
    state = false;
    noClick = false;
    constructor(
        private admobService: AdmobService,
        private platform: Platform,
        private togglesService: TogglesService
    ) {}

    ngOnInit() {
        this.checkShowOrHidden();
    }

    async checkShowOrHidden() {
        if (this.platform.is('capacitor')) {
            (await this.togglesService.isActiveToggle('admob'))
                ? (this.state = true)
                : (this.state = false);
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
