import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import {
  AnalyticsService,
  CarService,
  LikeService,
  SocialSharingService,
  ToastIonicService,
  UserService,
} from '@services';
import { Car, Like } from '@models';
import { CarViewModel } from '../../models/car.view-model';

@Component({
  selector: 'page-car',
  templateUrl: 'car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  vm = new CarViewModel();
  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private likeService: LikeService,
    private userService: UserService,
    private toastIonicService: ToastIonicService,
    private analyticsService: AnalyticsService,
    private socialSharingService: SocialSharingService
  ) {}

  async ngOnInit() {
    this.vm.id = this.route.snapshot.paramMap.get('id')!;
    this.vm.user = this.userService.getUser();
    this.getOne();
  }

  getOne(): void {
    this.vm.loading = true;
    this.carService.getOne(this.vm.id).subscribe({
      next: (data) => this.getOneSuccess(data),
      error: () => {
        this.vm.loading = false;
        this.vm.error = true;
      },
    });
  }

  async getOneSuccess(data: Car): Promise<void> {
    this.vm.car = data;
    this.vm.header.title = `${data.brand?.name} ${data.model}`;
    this.vm.liked = data.liked;

    this.setTotalsItem();
    if (this.userService.getUser()) {
      await this.checkIsMyCar();
    }
    this.vm.loading = false;
  }

  async checkIsMyCar(): Promise<void> {
    this.vm.isMyCar = this.vm.car.driver?._id === this.vm.user?._id;
    if (!this.vm.isMyCar) {
      const icon = this.vm.liked ? 'heart' : 'heart-outline';
      this.vm.header.rightButtons.unshift({ state: true, icon });
    }
  }

  setTotalsItem() {
    this.vm.items = {
      pairings: this.vm.car.pairings?.count ?? 0,
      pairingsWinners: this.vm.car.pairingsWinners?.count ?? 0,
      likes: this.vm.car.likes?.count ?? 0,
      inscriptions: this.vm.car.inscriptions?.count ?? 0,
      votes: this.vm.car.votes?.count ?? 0,
      tournamentsWinners: `${this.vm.car.gold?.count ?? 0}/${
        this.vm.car.silver?.count ?? 0
      }/${this.vm.car.bronze?.count ?? 0}`,
    };
  }

  onClickTotalItem(event: string): void {
    if (event === 'likes') {
      this.analyticsService.logEvent('car_total_likes');
      this.vm.states.votes = false;
      this.vm.states.inscriptions = false;
      this.vm.states.likes = !this.vm.states.likes;
    } else if (event === 'inscriptions') {
      this.analyticsService.logEvent('car_total_inscriptions');
      this.vm.states.votes = false;
      this.vm.states.likes = false;
      this.vm.states.inscriptions = !this.vm.states.inscriptions;
    } else if (event === 'votes') {
      this.analyticsService.logEvent('car_total_votes');
      this.vm.states.likes = false;
      this.vm.states.inscriptions = false;
      this.vm.states.votes = !this.vm.states.votes;
    }

    if (this.content) {
      setTimeout(() => {
        this.content.scrollToBottom(1500);
      }, 100);
    }
  }

  closeAllStates(): void {
    this.vm.states.votes = false;
    this.vm.states.likes = false;
    this.vm.states.inscriptions = false;
  }

  onClickRightButton(event: number) {
    if (this.vm.header.rightButtons.length === 1 || this.vm.isMyCar) {
      this.share();
    } else {
      if (event === 1) {
        this.share();
      } else {
        this.likeOrDislike();
      }
    }
  }

  share() {
    this.analyticsService.logEvent('car_share');
    this.socialSharingService.share(
      `${this.vm.car.brand.name} ${this.vm.car.model}`,
      `https://www.carstournaments.com/car/${this.vm.id}`
    );
  }

  async likeOrDislike(): Promise<void> {
    const like: Like = {
      car: this.vm.id,
    };
    if (this.vm.user) {
      like.user = this.vm.user._id;
    }
    if (!this.vm.liked) {
      this.like(like);
    } else {
      this.dislike();
    }
  }

  private like(like: Like): void {
    this.likeService.create(like).subscribe({
      next: async () => {
        this.vm.header.rightButtons[0].icon = 'heart';
        this.analyticsService.logEvent('car_like_OK', {
          params: { state: true },
        });
        this.vm.liked = true;
        if (this.vm.car.likes) {
          this.vm.car.likes.count += 1;
        } else {
          this.vm.car.likes = { count: 1 };
        }
      },
      error: (error) => {
        this.analyticsService.logEvent('car_like_KO', {
          params: { state: false },
        });
        this.toastIonicService.error(error ?? 'Error al dar me gusta');
      },
    });
  }

  private dislike() {
    this.likeService.deleteByCarId(this.vm.car._id).subscribe({
      next: async () => {
        this.vm.header.rightButtons[0].icon = 'heart-outline';
        this.analyticsService.logEvent('car_dislike_OK', {
          params: { state: true },
        });
        this.vm.liked = false;
        if (this.vm.car.likes) {
          this.vm.car.likes.count -= 1;
        } else {
          this.vm.car.likes = { count: 0 };
        }
      },
      error: () => {
        this.analyticsService.logEvent('car_dislike_KO', {
          params: { state: false },
        });
        this.toastIonicService.error('Error al eliminar el me gusta');
      },
    });
  }
}
