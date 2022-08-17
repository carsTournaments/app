import { Component } from '@angular/core';
import { config } from '@core/config';
import { NavController } from '@ionic/angular';
import { AnalyticsService, UserService, WinnerService } from '@services';
import { MyTournamentsWonViewModel } from '../model/my-trophies.view-model';

@Component({
  selector: 'page-my-trophies',
  templateUrl: 'my-trophies.page.html',
  styleUrls: ['./my-trophies.page.scss'],
})
export class MyTrophiesPage {
  vm = new MyTournamentsWonViewModel();
  constructor(
    private winnerService: WinnerService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private navCtrl: NavController
  ) {}

  ionViewWillEnter() {
    this.getAllUserWinners();
  }

  getAllUserWinners(event?: any) {
    const user = this.userService.getUser();
    this.winnerService.getAllUserWinners({ id: user._id }).subscribe({
      next: (response) => {
        if (event) {
          event.target.complete();
        }
        this.vm.items = response;
        this.vm.loading = false;
        this.vm.error = false;
      },
      error: (error) => {
        this.vm.loading = false;
        this.vm.error = true;
        console.error(error);
      },
    });
  }

  doRefresh(event: any): void {
    this.analyticsService.logEvent('myTrophies_refresh');
    this.getAllUserWinners(event);
  }

  segmentChanged(ev: any): void {
    this.vm.header.segments.selected = Number(ev.detail.value);
    this.analyticsService.logEvent(
      `myTrophies_segment_${
        this.vm.header.segments.items[this.vm.header.segments.selected]
      }`
    );
  }

  goToTourament(tournamentId: any): void {
    this.analyticsService.logEvent('myTrophies_goToTournament');
    this.navCtrl.navigateForward(
      config.routes.tournament.replace(':id', tournamentId)
    );
  }
}
