import { NavController } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import { User, Image } from '@models';
import { ImageService } from '@services';
import { UserGetResumeResponse } from '@services/api/user/user.responses';
import { config } from '@config';

@Component({
  selector: 'dashboard-resume',
  templateUrl: 'dashboard-resume.component.html',
  styleUrls: ['./dashboard-resume.component.scss'],
})
export class DashboardResumeComponent {
  @Input() items: UserGetResumeResponse;
  @Input() user: User;
  @Input() itemsOrder: { name: string; value: string }[];
  image: Image;
  constructor(
    private imageService: ImageService,
    private navCtrl: NavController
  ) {}

  openImage() {
    this.imageService.openImage(this.image.url);
  }

  goTo(type: string) {
    const route =
      type === 'garage' ? config.routes.myGarage : config.routes.myInscriptions;
    this.navCtrl.navigateForward([route]);
  }
}
