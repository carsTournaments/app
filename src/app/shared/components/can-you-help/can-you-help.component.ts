import { Component, OnInit } from '@angular/core';
import { ToggleService } from '@core/services/toggle.service';
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
    private toggleService: ToggleService
  ) {}

  ngOnInit() {
    this.checkShowOrHidden();
  }

  async checkShowOrHidden(): Promise<void> {
    if (this.platform.is('capacitor')) {
      this.state = await this.toggleService.isActiveToggle('admob');
    }
  }

  clickToHelp(): void {
    if (!this.noClick) {
      this.admobService.showInterstitial();
      this.antiClick();
    }
  }

  antiClick(): void {
    this.noClick = true;
    setTimeout(() => {
      this.noClick = false;
    }, 3000);
  }
}
