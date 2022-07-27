import { Component } from '@angular/core';
import { config } from '@config';
import { NavController } from '@ionic/angular';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { Pairing } from '@models';
import { EventsService, TournamentService } from '@services';
import { Subscription } from 'rxjs';
import { CalendarViewModel } from '../../models/calendar.view-model';

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.page.html',
})
export class CalendarPage {
  vm = new CalendarViewModel();
  event: Subscription;
  constructor(
    private tournamentService: TournamentService,
    private navCtrl: NavController,
    private eventsService: EventsService
  ) {}

  async ionViewWillEnter(): Promise<void> {
    this.getDates();
    this.onBackButton();
  }

  getDates() {
    this.tournamentService.getDaysForCalendar().subscribe({
      next: (dates) => {
        this.vm.dates = dates;
        if (this.vm.dates.length > 0) {
          this.vm.dateSelected = this.vm.dates[0];
          this.getItems();
          this.vm.loading = false;
        } else {
          this.vm.noDays = true;
          this.vm.loading = false;
        }
      },
    });
  }

  getItems() {
    return this.tournamentService
      .getCalendarItems(this.vm.dateSelected)
      .subscribe({
        next: (response) => {
          this.vm.rounds = response.rounds;
          this.vm.tournaments = response.tournaments;
        },
      });
  }

  onDateSelected(date: string) {
    this.vm.dateSelected = date;
    this.getItems();
  }

  onBackButton() {
    this.event = this.eventsService.subscribe('returnFromVote', (response) => {
      if (response.voted) {
        this.getItems();
      }
    });
  }

  onClickPairing(pairing: Pairing) {
    const options: NavigationOptions = {
      queryParams: {
        type: 'calendar',
      },
    };
    this.navCtrl.navigateForward(
      config.routes.pairing.replace(':id', pairing._id),
      options
    );
  }

  ngOnDestroy() {
    this.event.unsubscribe();
  }
}
