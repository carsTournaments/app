import {
    AlertService,
    AnalyticsService,
    CarService,
    ImageService,
    InscriptionService,
    LikeService,
    SocialSharingService,
    UserService,
    VoteService,
} from '@services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagePipe } from '@pipes';
import { Like } from '@models/like.model';
import { Car } from '@models';
import { IonContent } from '@ionic/angular';
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
        private imagePipe: ImagePipe,
        private imageService: ImageService,
        private likeService: LikeService,
        private inscriptionService: InscriptionService,
        private voteService: VoteService,
        private userService: UserService,
        private alertService: AlertService,
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
                this.analyticsService.logEvent('car_like_OK', {
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
                this.analyticsService.logEvent('car_like_KO', {
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
                this.analyticsService.logEvent('car_dislike_OK', {
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
                this.analyticsService.logEvent('car_dislike_KO', {
                    params: { state: false },
                });
                this.alertService.presentAlert(
                    'Error',
                    'Error al eliminar el me gusta'
                );
            },
        });
    }

    onClickTotalItem(event: string): void {
        if (event === 'likes') {
            this.analyticsService.logEvent('car_total_likes');
            this.vm.states.votes = false;
            this.vm.states.inscriptions = false;
            if (this.vm.likes.length === 0) {
                this.getLikes();
            }
            this.vm.states.likes = !this.vm.states.likes;
        } else if (event === 'inscriptions') {
            this.analyticsService.logEvent('car_total_inscriptions');
            this.vm.states.votes = false;
            this.vm.states.likes = false;
            if (this.vm.inscriptions.length === 0) {
                this.getInscriptions();
            }
            this.vm.states.inscriptions = !this.vm.states.inscriptions;
        } else if (event === 'votes') {
            this.analyticsService.logEvent('car_total_votes');
            this.vm.states.likes = false;
            this.vm.states.inscriptions = false;
            if (this.vm.votes.length === 0) {
                this.getVotes();
            }
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

    getLikes() {
        this.likeService.getAllOfCar({ id: this.vm.id, limit: '5' }).subscribe({
            next: (data) => {
                this.vm.likes = data;
            },
        });
    }

    getInscriptions() {
        this.inscriptionService
            .getAllOfCar({ id: this.vm.id, limit: '5' })
            .subscribe({
                next: (data) => {
                    this.vm.inscriptions = data;
                },
            });
    }

    getVotes() {
        this.voteService.getAllOfCar({ id: this.vm.id, limit: '5' }).subscribe({
            next: (data) => {
                this.vm.votes = data;
            },
        });
    }

    share() {
        this.socialSharingService.share(
            `${this.vm.car.brand.name} ${this.vm.car.model}`,
            `https://www.carstournaments.com/car/${this.vm.id}`
        );
    }
}
