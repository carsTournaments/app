import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models';
import { TournamentService } from 'src/app/services';
import { TournamentsViewModel } from './model/tournaments.view-model';

@Component({
    selector: 'page-tournaments',
    templateUrl: 'tournaments.page.html',
    styleUrls: ['tournaments.page.scss'],
})
export class TournamentsPage implements OnInit {
    vm = new TournamentsViewModel();

    constructor(
        private tournamentService: TournamentService,
        private navCtrl: NavController
    ) {}

    async ngOnInit() {
        this.getItems();
    }

    getItems() {
        this.tournamentService.getAllOfAllStates().subscribe({
            next: (res) => {
                this.vm.tournaments = res;
                this.vm.loading = false;
            },
            error: () => {
                this.vm.loading = false;
                this.vm.error = true;
            },
        });
    }

    segmentChanged(ev: any) {
        const segment = Number(ev.detail.value);
        this.vm.header.segments.selected = Number(segment);
    }

    goTo(event: Tournament) {
        this.navCtrl.navigateForward(['/tournament', event._id]);
    }
}
