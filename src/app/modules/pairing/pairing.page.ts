import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, ModalOptions, Platform } from '@ionic/angular';
import { PairingViewModel } from './model/pairing.view-model';
import { PairingModalComponent } from './modal/pairing-modal.component';
import {
    AlertService,
    PairingService,
    StorageService,
    VoteService,
} from 'src/app/services';
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
            next: (item) => {
                this.vm.pairing = item;
                const height = this.platform.height() - 90;
                this.vm.totalHeight = height;
                this.vm.header.backButton.route = `tournament/${this.vm.pairing.tournament._id}`;
            },
            error: (error) => console.error(error),
        });
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
        const vote = new Vote({
            pairing: this.vm.id,
            round: this.vm.pairing.round._id,
            tournament: this.vm.pairing.tournament._id,
            car: this.vm.pairing[type]._id,
        });
        if (await this.voteService.isValidVote(vote)) {
            this.voteService.create(vote).subscribe({
                next: (item) => this.onVoteSuccess(item),
                error: (error) => console.error(error),
            });
        } else {
            this.alertService.presentAlert(
                'Error',
                'Ya has votado en este emparejamiento'
            );
        }
    }

    onVoteSuccess(vote: Vote) {
        this.voteService.setValidVote(vote);
        this.alertService.presentAlert(
            'Voto registrado',
            'El Voto se ha registrado correctamente, ¡gracias!'
        );
    }
}
