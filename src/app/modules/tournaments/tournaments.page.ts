import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/models';
import { TournamentService } from 'src/app/services';
import { TournamentGetAllOfAllStatesResponse } from 'src/app/services/api/tournament/tournament.responses';
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
            next: (res) => this.getItemsOnSuccess(res),
            error: () => {
                this.vm.loading = false;
                this.vm.error = true;
            },
        });
    }

    getItemsOnSuccess(res: TournamentGetAllOfAllStatesResponse) {
        this.vm.tournaments = res;
        if (this.vm.tournaments.todo.length === 0) {
            this.vm.header.segments.items =
                this.vm.header.segments.items.filter(
                    (item) => item !== 'Proximos'
                );
        }
        if (this.vm.tournaments.inProgress.length === 0) {
            this.vm.header.segments.items =
                this.vm.header.segments.items.filter(
                    (item) => item !== 'En curso'
                );
        }
        if (this.vm.tournaments.completed.length === 0) {
            this.vm.header.segments.items =
                this.vm.header.segments.items.filter(
                    (item) => item !== 'Completados'
                );
        }
        this.vm.loading = false;
    }

    segmentChanged(ev: any) {
        const segment = Number(ev.detail.value);
        this.vm.header.segments.selected = Number(segment);
    }

    goTo(event: Tournament) {
        this.navCtrl.navigateForward(['/tournament', event._id]);
    }
}
