import { NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { User, Image } from 'src/app/models';
import { ImagePipe } from 'src/app/pipes';
import { ImageService } from 'src/app/services';
import { UserGetResumeResponse } from 'src/app/services/api/user/user.responses';

@Component({
    selector: 'dashboard-resume',
    templateUrl: 'dashboard-resume.component.html',
    styleUrls: ['./dashboard-resume.component.scss'],
})
export class DashboardResumeComponent implements OnInit {
    @Input() resume: UserGetResumeResponse;
    @Input() user: User;
    image: Image;
    constructor(
        private imagePipe: ImagePipe,
        private imageService: ImageService,
        private navCtrl: NavController
    ) {}

    ngOnInit() {
        this.setImageForBackground();
    }

    setImageForBackground() {
        if (this.resume) {
            this.image = {
                url: this.imagePipe.transform(
                    this.resume.image ? this.resume.image : null
                ),
            };
        }
    }

    openImage() {
        this.imageService.openImage(this.image.url);
    }

    goTo(type: string) {
        const route = type === 'garage' ? '/garage' : '/inscriptions';
        this.navCtrl.navigateForward([route]);
    }
}
