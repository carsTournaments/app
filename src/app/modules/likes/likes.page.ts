import { Car } from '@models/car.model';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService, LikeService } from '@services';
import { LikesViewModel } from './model/likes.view-model';

@Component({
    selector: 'page-likes',
    templateUrl: 'likes.page.html',
})
export class LikesPage {
    vm = new LikesViewModel();
    constructor(
        private likesService: LikeService,
        private authService: AuthService,
        private navCtrl: NavController
    ) {}

    async ionViewWillEnter() {
        this.vm.user = await this.authService.getUser();
        this.getAllReceivedForUser();
        this.getAllSentForUser();
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
        this.navCtrl.navigateForward(`/car/${car._id}`);
    }

    segmentChanged(event: { detail: { value: any } }) {
        this.vm.header.segments.selected = Number(event.detail.value);
    }
}
