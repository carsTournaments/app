import {
    AlertService,
    AuthService,
    CarService,
    ImageService,
    LikeService,
    StorageService,
} from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagePipe } from 'src/app/pipes';
import { CarViewModel } from './model/car.view-model';
import { Like } from 'src/app/models/like.model';

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
        private storageService: StorageService,
        private alertService: AlertService
    ) {}

    async ngOnInit() {
        this.vm.id = this.route.snapshot.paramMap.get('id');
        this.vm.user = await this.authService.getUser();
        this.getOne();
    }

    getOne() {
        this.vm.loading = true;
        this.carService.getOne(this.vm.id).subscribe({
            next: (data) => {
                this.vm.car = data;
                this.vm.header.title = `${data.brand?.name} ${data.model}`;
                if (data && data.image) {
                    this.vm.image = this.imagePipe.transform(data.image.url);
                }
                if (data.liked) {
                    this.vm.liked = true;
                }
                this.checkLikedStorage();
                this.checkIsMyCar();
                this.vm.loading = false;
            },
            error: () => {
                this.vm.loading = false;
                this.vm.error = true;
            },
        });
    }

    checkIsMyCar() {
        this.vm.isMyCar = this.vm.car.driver._id === this.vm.user._id;
    }

    openImage(image: string) {
        this.imageService.openImage(image);
    }

    async like() {
        const like: Like = {
            car: this.vm.id,
        };
        if (this.vm.user) {
            like.user = this.vm.user._id;
        }
        this.likeService.create(like).subscribe({
            next: async (response) => {
                this.vm.liked = true;
                this.setLikedStorage(response.car);
                this.vm.car.likes += 1;
            },
            error: () =>
                this.alertService.presentAlert(
                    'Error',
                    'Error al dar me gusta'
                ),
        });
    }

    async checkLikedStorage() {
        const likes = await this.storageService.get<string[]>('likes');
        if (likes) {
            const like = likes.find((l) => l === this.vm.id);
            if (like) {
                this.vm.liked = true;
                return;
            }
        }
    }

    async setLikedStorage(id: string) {
        let likes = await this.storageService.get<string[]>('likes');
        if (likes) {
            likes.push(id);
        } else {
            likes = [id];
        }
        this.storageService.set('likes', likes);
    }
}
