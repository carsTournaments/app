import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ModalOptions, Platform } from '@ionic/angular';
import { PairingViewModel } from './model/pairing.view-model';
import { PairingModalComponent } from './modal/pairing-modal.component';
import { AlertService, PairingService, VoteService } from 'src/app/services';
import { Car, Vote } from 'src/app/models';

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
        private alertService: AlertService
    ) {}

    async ngOnInit(): Promise<void> {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.getOne();
    }

    getOne() {
        this.pairingService.getOne(this.vm.id).subscribe({
            next: async (item) => {
                this.vm.pairing = item;
                const height = this.platform.height() - 90;
                this.vm.totalHeight = height;
                this.vm.header.backButton.route = `tournament/${this.vm.pairing.tournament._id}`;
                await this.setPercentages();
            },
            error: (error) => console.error(error),
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
    }

    async openModal(car: Car) {
        const options: ModalOptions = {
            component: PairingModalComponent,
            mode: 'ios',
            cssClass: 'modal-pairing',
            componentProps: {
                car,
            },
        };
        const popover = await this.modalCtrl.create(options);
        popover.present();
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
        // generate percentage of votes
        cars.car1.percentage = Math.round(
            (cars.car1.votes * 100) / (cars.car1.votes + cars.car2.votes)
        );
        cars.car2.percentage = Math.round(
            (cars.car2.votes * 100) / (cars.car1.votes + cars.car2.votes)
        );
        this.vm.votes = cars;
    }
}
