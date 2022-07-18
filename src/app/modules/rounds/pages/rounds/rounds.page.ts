import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Car, Pairing } from '@models';
import { RoundService } from '@services';
import { ImagePipe } from '@pipes';
import { RoundsViewModel } from '../../models/rounds.view-model';
import { ActivatedRoute } from '@angular/router';
import { config } from '@config';
import { Subscription } from 'rxjs';

@Component({
    selector: 'page-rounds',
    templateUrl: 'rounds.page.html',
    styleUrls: ['./rounds.page.scss'],
})
export class RoundsPage {
    vm = new RoundsViewModel();
    event: Subscription;
    constructor(
        private roundService: RoundService,
        private navCtrl: NavController,
        private imagePipe: ImagePipe,
        private route: ActivatedRoute
    ) {}

    ionViewWillEnter() {
        this.vm.tournamentId = this.route.snapshot.paramMap.get('id')!;
        this.getAllRoundsAndPairingsOfTournament();
    }

    getAllRoundsAndPairingsOfTournament() {
        this.roundService
            .getAllOfTournament({ id: this.vm.tournamentId })
            .subscribe({
                next: (r) => {
                    this.vm.rounds = r;
                    this.filterRounds();
                    this.setTitle();
                },
            });
    }

    private filterRounds() {
        this.vm.rounds = this.vm.rounds.filter(
            (r) => r.status === 'InProgress' || r.status === 'Completed'
        );
        const round = this.vm.rounds.find(
            (r) => r.status === 'InProgress' || r.name === 'Final'
        );
        if (round) {
            this.vm.roundSelected = round._id;
        }
    }

    private setTitle() {
        this.vm.header.title = `Rondas / ${
            this.vm.rounds.find((r) => r._id === this.vm.roundSelected).name
        }`;
    }

    segmentChanged(event) {
        this.vm.roundSelected = event.target.value;
        this.setTitle();
    }

    goToPairing(pairing: Pairing) {
        this.navCtrl.navigateForward(
            config.routes.pairing.replace(':id', pairing._id)
        );
    }

    getBackgroundImage(car: Car) {
        const image = this.imagePipe.transform(
            car.image && car.image.url ? car.image.url : null
        );
        return `linear-gradient(rgba(0, 0, 0, 0.43),
                rgba(0, 0, 0, 0.43)),
                url('${image}')`;
    }
}
