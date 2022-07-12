import { Car } from '@models/car.model';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LikeService, UserService } from '@services';
import { TranslatePipe } from '@ngx-translate/core';
import { MyLikesViewModel } from '../../models/my-likes.view-model';
import { config } from '@config';

@Component({
    selector: 'page-my-likes',
    templateUrl: 'my-likes.page.html',
    styleUrls: ['./my-likes.page.scss'],
    providers: [TranslatePipe],
})
export class MyLikesPage {
    vm = new MyLikesViewModel();
    constructor(
        private likesService: LikeService,
        private userService: UserService,
        private navCtrl: NavController,
        private translatePipe: TranslatePipe
    ) {}

    async ionViewWillEnter() {
        this.translate();
        this.vm.user = this.userService.getUser();
        this.getAllReceivedForUser();
        this.getAllSentForUser();
    }

    translate() {
        this.vm.header.title = this.translatePipe.transform('likes.title');
        this.vm.header.segments.items[0] =
            this.translatePipe.transform('likes.segment1');
        this.vm.header.segments.items[1] =
            this.translatePipe.transform('likes.segment2');
        this.vm.noitemsReceived.title = this.translatePipe.transform(
            'likes.titleNoitemsReceived'
        );
        this.vm.noitemsReceived.subtitle = this.translatePipe.transform(
            'likes.subtitleNoitemsReceived'
        );
        this.vm.noitemsSent.title = this.translatePipe.transform(
            'likes.titleNoitemsSent'
        );
        this.vm.noitemsSent.subtitle = this.translatePipe.transform(
            'likes.subtitleNoitemsSent'
        );
    }

    getAllReceivedForUser() {
        this.likesService
            .getAllReceivedForUser({ id: this.vm.user._id })
            .subscribe({
                next: (response) => {
                    this.vm.likesReceived = response;
                    this.vm.loading = false;
                    this.vm.error = false;
                },
                error: () => {
                    this.vm.loading = false;
                    this.vm.error = true;
                },
            });
    }

    async getAllSentForUser() {
        this.likesService
            .getAllSentForUser({ id: this.vm.user._id })
            .subscribe({
                next: (response) => {
                    this.vm.likesSent = response;
                },
            });
    }

    onClickCar(car: Car) {
        this.navCtrl.navigateForward(config.routes.car.replace(':id', car._id));
    }

    segmentChanged(event: any) {
        this.vm.header.segments.selected = Number(event.detail.value);
    }
}
