import { Car } from './../../models/car.model';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService, LikeService } from 'src/app/services';
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

    ionViewWillEnter() {
        this.getLikes();
    }

    async getLikes() {
        const user = await this.authService.getUser();
        this.likesService.getAllReceivedForUser({ id: user._id }).subscribe({
            next: (response) => {
                console.log(response);
                this.vm.likesReceived = response;
                this.vm.loading = false;
                this.vm.error = false;
            },
            error: (error) => {
                this.vm.loading = false;
                this.vm.error = true;
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
