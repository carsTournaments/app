import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/app/models';
import { TournamentService } from 'src/app/services';
import { TournamentGetAllOfAllStatesResponse } from 'src/app/services/api/tournament/tournament.responses';
import { TournamentsListViewModel } from '..';

@Component({
    selector: 'app-tournaments-list',
    templateUrl: 'tournaments-list.page.html',
    styleUrls: ['tournaments-list.page.scss'],
})
export class TournamentsListPage implements OnInit {
    vm = new TournamentsListViewModel();

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
            error: (err) => console.error(err),
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
    }

    segmentChanged(ev: any) {
        const segment = Number(ev.detail.value);
        this.vm.header.segments.selected = Number(segment);
    }

    goTo(event: Tournament) {
        this.navCtrl.navigateForward(['/tournament', event._id]);
    }
}
