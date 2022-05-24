import { NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Car, Pairing, Round } from '@models';
import { RoundService } from '@services';
import { ImagePipe } from '@pipes';

@Component({
    selector: 'tournament-rounds',
    templateUrl: 'tournament-rounds.component.html',
    styleUrls: ['./tournament-rounds.component.scss'],
})
export class TournamentRoundsComponent implements OnInit {
    @Input() tournamentId: string;
    rounds: Round[] = [];
    roundSelected = '';
    segmentsRounds = [];
    constructor(
        private roundService: RoundService,
        private navCtrl: NavController,
        private imagePipe: ImagePipe
    ) {}

    ngOnInit() {
        this.getAllRoundsAndPairingsOfTournament();
    }

    ionViewWillEnter() {
        this.getAllRoundsAndPairingsOfTournament();
    }

    getAllRoundsAndPairingsOfTournament() {
        this.roundService
            .getAllOfTournament({ id: this.tournamentId })
            .subscribe({
                next: (r) => {
                    this.rounds = r;
                    this.filterRounds();
                },
            });
    }

    filterRounds() {
        this.rounds = this.rounds.filter(
            (r) => r.status === 'InProgress' || r.status === 'Completed'
        );
        const round = this.rounds.find(
            (r) => r.status === 'InProgress' || r.name === 'Final'
        );
        if (round) {
            this.roundSelected = round._id;
        }
    }

    segmentChanged(event) {
        this.roundSelected = event.target.value;
    }

    goToPairing(pairing: Pairing) {
        this.navCtrl.navigateForward(`/pairing/${pairing._id}`);
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
