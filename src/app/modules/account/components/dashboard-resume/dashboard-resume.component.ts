import { NavController } from '@ionic/angular';
import { Component, Input } from '@angular/core';
import { User, Image } from '@models';
import { ImageService } from '@services';
import { UserGetResumeResponse } from '@services/api/user/user.responses';

@Component({
    selector: 'dashboard-resume',
    templateUrl: 'dashboard-resume.component.html',
    styleUrls: ['./dashboard-resume.component.scss'],
})
export class DashboardResumeComponent {
    @Input() resume: UserGetResumeResponse;
    @Input() user: User;
    image: Image;
    constructor(
        private imageService: ImageService,
        private navCtrl: NavController
    ) {}

    openImage() {
        this.imageService.openImage(this.image.url);
    }

    goTo(type: string) {
        const route = type === 'garage' ? '/garage' : '/inscriptions';
        this.navCtrl.navigateForward([route]);
    }
}
