import { TournamentService } from '../../services/api/tournament/tournament.service';
import { TournamentsViewModel } from './model/tournaments.view-model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tournaments',
    templateUrl: 'tournaments.page.html',
    styleUrls: ['tournaments.page.scss'],
})
export class TournamentsPage implements OnInit {
    vm = new TournamentsViewModel();

    constructor(private tournamentService: TournamentService) { }

    async ngOnInit() {
        this.getItems(null, { status: 'InProgress', items: 'tournamentsInProgress' });
        this.getItems(null, { status: 'Todo', items: 'tournamentsTodo' });
        this.getItems(null, { status: 'Completed', items: 'tournamentsCompleted' });
    }

    checkFirstValues() {
        if (this.vm.tournamentsCompleted.length === 0) {
            this.vm.segments.items = this.vm.segments.items.filter((item) => item !== 'Completados');
        }
    }


    getItems(event?: any, statusForce?: { status: string, items: string }) {
        const statusItem = this.getItemsValueByStatus(statusForce);
        this.vm.tournamentsBody.status = statusItem.status;
        this.tournamentService.getAll(this.vm.tournamentsBody).subscribe({
            next: (res) => this.getItemsOnSuccess(res, statusItem, event),
            error: (err) => console.log(err),
        });
    }

    getItemsValueByStatus(statusForce?: { status: string, items: string }): { status: string, items: string } {
        if (statusForce !== undefined) {
            return statusForce;
        } else {
            const segment = this.vm.segments.selected;
            if (segment === 0) {
                return { status: 'InProgress', items: 'tournamentsInProgress' };
            } else if (segment === 1) {
                return { status: 'Todo', items: 'tournamentsTodo' };
            } else if (segment === 2) {
                return { status: 'Completed', items: 'tournamentsCompleted' };
            }
        }

    }

    getItemsOnSuccess(res: any, statusItem: { status: string, items: string }, event?: any, ) {
        const itemsValue: string = statusItem.items;
        if (event) {
            if (res.items.length > 0) {
                this.vm[itemsValue] = this.vm[itemsValue].concat(res.items);
                event.target.complete();
            } else {
                event.target.disabled = true;
            }
        } else {
            this.vm[itemsValue] = res.items;
            if (itemsValue === 'tournamentsCompleted') {
                this.checkFirstValues();
            }
        }
    }

    segmentChanged(ev: any) {
        const segment = Number(ev.detail.value)
        this.vm.segments.selected = Number(segment);
        if (segment === 0 && this.vm.tournamentsInProgress.length === 0 ||
            segment === 1 && this.vm.tournamentsTodo.length === 0 ||
            segment === 2 && this.vm.tournamentsCompleted.length === 0) {
            this.getItems();
        }
    }

    goTo(event) {
        console.log(event);
    }
}
