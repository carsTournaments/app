import { Component } from '@angular/core';
import { ToggleService } from '@core/services/toggle.service';
import { Platform } from '@ionic/angular';
import { AppUpdateService } from '@services';
import { AboutViewModel } from '../model/about.view-model';

@Component({
  selector: 'page-about',
  templateUrl: 'about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  vm = new AboutViewModel();
  constructor(
    private platform: Platform,
    private appUpdateService: AppUpdateService,
    private toggleService: ToggleService
  ) {}

  ionViewWillEnter() {
    this.getInfo();
  }

  async getInfo() {
    if (await this.toggleService.isActiveToggle('account_aboutUpdate')) {
      if (this.platform.is('capacitor')) {
        this.vm.info = await this.appUpdateService.getAppUpdateInfo();
        this.vm.stateButtonsUpdate =
          Number(this.vm.info.currentVersion) <
          Number(this.vm.info.availableVersion);
      }
    }
  }

  forceUpdate(type: string) {
    if (type === 'immediate') {
      this.appUpdateService.performImmediateUpdate();
    } else {
      this.appUpdateService.startFlexibleUpdate();
    }
  }
}
