import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ModalOptions } from '@ionic/angular';
import { PairingViewModel } from './model/pairing.view-model';
import {
    PairingService,
    SocialSharingService,
    UserService,
    VoteService,
} from '@services';
import { ImagePipe } from '@pipes';
import { ReportModalComponent } from '@components/report-modal/report-modal.component';

@Component({
    selector: 'page-pairing',
    templateUrl: 'pairing.page.html',
})
export class PairingPage implements OnInit {
    vm = new PairingViewModel();

    constructor(
        private route: ActivatedRoute,
        private pairingService: PairingService,
        private modalCtrl: ModalController,
        private imagePipe: ImagePipe,
        private voteService: VoteService,
        private socialSharingService: SocialSharingService,
        private userService: UserService
    ) {}

    async ngOnInit(): Promise<void> {
        this.vm.loading = true;
        this.vm.id = this.route.snapshot.paramMap.get('id');
        this.vm.user = this.userService.getUser();
        if (this.vm.user) {
            this.vm.reportState = true;
        }
        this.getOne();
    }

    getOne() {
        this.pairingService.getOne(this.vm.id).subscribe({
            next: async (item) => {
                this.vm.pairing = item;
                this.vm.backButtonRoute = `tournament/${this.vm.pairing.tournament._id}`;
                this.setImageForBackground('car1');
                this.setImageForBackground('car2');
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
                this.vm.loading = false;
            },
            error: (error) => {
                this.vm.loading = false;
                console.error(error);
            },
        });
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

    share() {
        this.socialSharingService.share(
            `¡${this.vm.pairing.round.name} del torneo ${
                this.vm.pairing.tournament.name
            }! ${
                this.vm.pairing.car1.brand.name +
                ' ' +
                this.vm.pairing.car1.model
            } vs ${
                this.vm.pairing.car2.brand.name +
                ' ' +
                this.vm.pairing.car2.model
            }`,
            `https://www.carstournaments.com/pairing/${this.vm.id}`
        );
    }
}
