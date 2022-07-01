import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Tournament } from '@models';
import { TournamentsViewModel } from './model/tournaments.view-model';
import { TournamentService, AnalyticsService } from '@services';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'page-tournaments',
    templateUrl: 'tournaments.page.html',
    styleUrls: ['tournaments.page.scss'],
})
export class TournamentsPage {
    vm = new TournamentsViewModel();
    constructor(
        private tournamentService: TournamentService,
        private navCtrl: NavController,
        private analyticsService: AnalyticsService,
        private translate: TranslateService
    ) {}

    async ionViewWillEnter() {
        this.vm.header.title = this.translate.instant('tournaments.title');
        this.getItems();
    }

    getItems(event?: any) {
        this.tournamentService.getAllOfAllStates().subscribe({
            next: (res) => {
                this.vm.tournaments = res;
                if (event) {
                    event.target.complete();
                }
                this.vm.loading = false;
            },
            error: () => {
                this.vm.loading = false;
                this.vm.error = true;
            },
        });
    }

    goToTournament(item: Tournament) {
        this.analyticsService.logEvent('tournaments_goToTournament', {
            params: {
                tournament_id: item._id,
                tournament_name: item.name,
            },
        });
        this.navCtrl.navigateForward(['/tournament', item._id]);
    }

    doRefresh(event: any) {
        this.analyticsService.logEvent('tournaments_refresh', {});
        this.getItems(event);
    }
}
