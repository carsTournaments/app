import {
    AlertService,
    AnalyticsService,
    AuthService,
    CarService,
    ImageService,
    LikeService,
} from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagePipe } from 'src/app/pipes';
import { CarViewModel } from './model/car.view-model';
import { Like } from 'src/app/models/like.model';
import { Car } from 'src/app/models';

@Component({
    selector: 'page-car',
    templateUrl: 'car.page.html',
    styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
    vm = new CarViewModel();
    constructor(
        private carService: CarService,
        private route: ActivatedRoute,
        private imagePipe: ImagePipe,
        private imageService: ImageService,
        private likeService: LikeService,
        private authService: AuthService,
        private alertService: AlertService,
        private analyticsService: AnalyticsService
    ) {}

    async ngOnInit() {
        this.vm.id = this.route.snapshot.paramMap.get('id');
        this.vm.user = await this.authService.getUser();
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
        if (data && data.image) {
            this.vm.image = this.imagePipe.transform(data.image.url);
        }
        if (data.liked) {
            this.vm.liked = true;
        }
        this.vm.liked = await this.likeService.checkLikedStorage(this.vm.id);
        this.checkIsMyCar();
        this.vm.loading = false;
    }

    checkIsMyCar(): void {
        this.vm.isMyCar = this.vm.car.driver?._id === this.vm.user?._id;
    }

    openImage(image: string): void {
        this.analyticsService.logEvent('car_openImage', { params: { image } });
        this.imageService.openImage(image);
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
                this.analyticsService.logEvent('car_like', {
                    params: { state: true },
                });
                this.vm.liked = true;
                this.likeService.setLikedStorage(this.vm.car._id);
                if (this.vm.car.likes) {
                    this.vm.car.likes.count += 1;
                } else {
                    this.vm.car.likes = { count: 1 };
                }
            },
            error: () => {
                this.analyticsService.logEvent('car_like', {
                    params: { state: false },
                });
                this.alertService.presentAlert(
                    'Error',
                    'Error al dar me gusta'
                );
            },
        });
    }

    private dislike() {
        this.likeService.deleteByCarId(this.vm.car._id).subscribe({
            next: async () => {
                this.analyticsService.logEvent('car_dislike', {
                    params: { state: true },
                });
                this.likeService.removeLikeStorage(this.vm.car._id);
                this.vm.liked = false;
                if (this.vm.car.likes) {
                    this.vm.car.likes.count -= 1;
                } else {
                    this.vm.car.likes = { count: 0 };
                }
            },
            error: () => {
                this.analyticsService.logEvent('car_dislike', {
                    params: { state: false },
                });
                this.alertService.presentAlert(
                    'Error',
                    'Error al eliminar el me gusta'
                );
            },
        });
    }
}
