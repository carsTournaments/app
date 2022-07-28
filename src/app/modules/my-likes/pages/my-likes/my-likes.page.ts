import { Car } from '@models/car.model';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LikeService, UserService } from '@services';
import { TranslateService } from '@ngx-translate/core';
import { MyLikesViewModel } from '../../models/my-likes.view-model';
import { config } from '@config';

@Component({
  selector: 'page-my-likes',
  templateUrl: 'my-likes.page.html',
  styleUrls: ['./my-likes.page.scss'],
})
export class MyLikesPage {
  vm = new MyLikesViewModel();
  constructor(
    private likesService: LikeService,
    private userService: UserService,
    private navCtrl: NavController,
    private translate: TranslateService
  ) {}

  async ionViewWillEnter() {
    this.translateItems();
    this.vm.user = this.userService.getUser();
    this.getAllReceivedForUser();
    this.getAllSentForUser();
  }

  translateItems() {
    this.vm.header.title = this.translate.instant('likes.title');
    this.vm.header.segments.items[0] = this.translate.instant('likes.segment1');
    this.vm.header.segments.items[1] = this.translate.instant('likes.segment2');
    this.vm.noitemsReceived.title = this.translate.instant(
      'likes.titleNoitemsReceived'
    );
    this.vm.noitemsReceived.subtitle = this.translate.instant(
      'likes.subtitleNoitemsReceived'
    );
    this.vm.noitemsSent.title = this.translate.instant(
      'likes.titleNoitemsSent'
    );
    this.vm.noitemsSent.subtitle = this.translate.instant(
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
      .getAllUserSubmittedLikes({ id: this.vm.user._id })
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
