import { NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Pairing, Round } from 'src/app/models';
import { RoundService } from 'src/app/services';

@Component({
    selector: 'rounds',
    templateUrl: 'rounds.component.html',
    styleUrls: ['./rounds.component.scss'],
})
export class RoundsComponent implements OnInit {
    @Input() tournamentId: string;
    rounds: Round[] = [];
    roundSelected = '';
    segmentsRounds = [];
    constructor(
        private roundService: RoundService,
        private navCtrl: NavController
    ) {}

    ngOnInit() {
        this.getAllRoundsAndPairingsOfTournament();
    }

    getAllRoundsAndPairingsOfTournament() {
        this.roundService
            .getAllOfTournament({ id: this.tournamentId })
            .subscribe({
                next: (rounds) => {
                    this.rounds = rounds;
                    this.filterRounds();
                },
                error: (err) => {},
            });
    }

    filterRounds() {
        this.rounds = this.rounds.filter(
            (round) =>
                round.status === 'InProgress' || round.status === 'Completed'
        );
        this.roundSelected = this.rounds.find(
            (round) => round.status === 'InProgress'
        )._id;
    }

    segmentChanged(event) {
        this.roundSelected = event.target.value;
    }

    goToPairing(pairing: Pairing) {
        this.navCtrl.navigateForward(`/pairing/${pairing._id}`);
    }
}
