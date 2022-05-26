import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ModalOptions, Platform } from '@ionic/angular';
import { PairingViewModel } from './model/pairing.view-model';
import { PairingModalComponent } from './modal/pairing-modal.component';
import {
    AlertService,
    AuthService,
    ImageService,
    PairingService,
    UserService,
    VoteService,
} from '@services';
import { Car, Vote } from '@models';
import { ImagePipe } from '@pipes';
import { ReportModalComponent } from '@components/report-modal/report-modal.component';

@Component({
    selector: 'page-pairing',
    templateUrl: 'pairing.page.html',
    styleUrls: ['./pairing.page.scss'],
})
export class PairingPage implements OnInit {
    vm = new PairingViewModel();

    constructor(
        private route: ActivatedRoute,
        private pairingService: PairingService,
        private platform: Platform,
        private modalCtrl: ModalController,
        private voteService: VoteService,
        private alertService: AlertService,
        private imageService: ImageService,
        private imagePipe: ImagePipe,
        private userService: UserService
    ) {}

    async ngOnInit(): Promise<void> {
        this.vm.loading = true;
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.vm.user = this.userService.getUser();
        if (this.vm.user) {
            this.vm.header.rightButton = {
                state: true,
                icon: 'alert-circle-outline',
            };
        }
        this.getOne();
    }

    getOne() {
        this.pairingService.getOne(this.vm.id).subscribe({
            next: async (item) => {
                this.vm.pairing = item;
                const headers = document.getElementsByTagName('ion-header');
                const headerHeight =
                    headers[headers.length - 1].clientHeight + 20;
                this.vm.totalHeight = this.platform.height() - headerHeight;
                this.vm.header.backButton.route = `tournament/${this.vm.pairing.tournament._id}`;
                await this.setPercentages();
                this.setImageForBackground('car1');
                this.setImageForBackground('car2');
                this.vm.loading = false;
            },
            error: (error) => {
                this.vm.loading = false;
                console.error(error);
            },
        });
    }

    async setPercentages() {
        this.setObjectVotes();
        this.vm.voteBody.pairing = this.vm.pairing._id;
        this.vm.voteBody.tournament = this.vm.pairing.tournament._id;
        this.vm.voteBody.round = this.vm.pairing.round._id;
        if (await this.voteService.isValidVote(this.vm.voteBody)) {
            this.vm.voted = false;
        } else {
            this.vm.voted = true;
        }

        if (this.vm.pairing.round.status === 'Completed') {
            this.vm.voted = true;
        }
    }

    async openInfoModal(car: Car) {
        const options: ModalOptions = {
            component: PairingModalComponent,
            mode: 'ios',
            cssClass: 'modal-pairing',
            componentProps: {
                car,
            },
        };
        const modal = await this.modalCtrl.create(options);
        modal.present();
    }

    async vote(type: string) {
        this.vm.voteBody.car = this.vm.pairing[type]._id;
        this.voteService.create(this.vm.voteBody).subscribe({
            next: (item) => this.onVoteSuccess(item),
            error: (error) => console.error(error),
        });
    }

    onVoteSuccess(vote: Vote) {
        const car = vote.car === this.vm.pairing.car1._id ? 'car1' : 'car2';
        this.voteService.setValidVote(vote);
        this.vm.pairing.votes.push(vote);
        this.setObjectVotes(car);
        this.vm.voted = true;
        this.alertService.presentAlert(
            'Voto registrado',
            'El Voto se ha registrado correctamente, ¡gracias!'
        );
    }

    setObjectVotes(force?: any): void {
        const cars = {
            car1: { votes: 0, percentage: 0 },
            car2: { votes: 0, percentage: 0 },
        };
        for (const vote of this.vm.pairing.votes) {
            if (
                vote.car === this.vm.pairing.car1 ||
                vote.car === this.vm.pairing.car1._id
            ) {
                cars.car1.votes++;
            } else {
                cars.car2.votes++;
            }
        }
        if (force) {
            cars[force].votes++;
        }

        if (cars.car1.votes === 0 && cars.car2.votes === 0) {
            cars.car1.percentage = 50;
            cars.car2.percentage = 50;
        } else {
            cars.car1.percentage = Number(
                (
                    (cars.car1.votes * 100) /
                    (cars.car1.votes + cars.car2.votes)
                ).toFixed(0)
            );
            cars.car2.percentage = Number(
                (
                    (cars.car2.votes * 100) /
                    (cars.car1.votes + cars.car2.votes)
                ).toFixed(0)
            );
        }

        this.vm.pairing.car1.votes = cars.car1.votes;
        this.vm.pairing.car1.percentage = cars.car1.percentage;
        this.vm.pairing.car2.votes = cars.car2.votes;
        this.vm.pairing.car2.percentage = cars.car2.percentage;

        this.vm.votes = cars;
    }

    setImageForBackground(type: 'car1' | 'car2') {
        if (this.vm.pairing[type]) {
            this.vm[type === 'car1' ? 'image1' : 'image2'] = {
                url: this.imagePipe.transform(
                    this.vm.pairing[type].image &&
                        this.vm.pairing[type].image.url
                        ? this.vm.pairing[type].image.url
                        : null
                ),
            };
        }
    }

    openImage(image: string) {
        this.imageService.openImage(image);
    }

    async openReportModal() {
        const options: ModalOptions = {
            component: ReportModalComponent,
            mode: 'ios',
            cssClass: 'modal-report',
            componentProps: {
                pairing: this.vm.pairing,
                userId: this.vm.user._id,
            },
        };
        const modal = await this.modalCtrl.create(options);
        modal.present();
    }
}
