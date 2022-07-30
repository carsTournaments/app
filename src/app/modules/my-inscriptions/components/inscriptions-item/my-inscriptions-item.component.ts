import { NavController } from '@ionic/angular';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car, Tournament } from '@models';
import { config } from '@config';
import { AnalyticsService } from '@services';

@Component({
  selector: 'my-inscriptions-item',
  templateUrl: 'my-inscriptions-item.component.html',
  styleUrls: ['./my-inscriptions-item.component.scss'],
})
export class MyInscriptionsItemComponent {
  @Input() item: {
    tournament: Tournament;
    cars: Car[];
  };
  @Output() openOptions: EventEmitter<{
    carId: string;
    tournamentId: string;
  }> = new EventEmitter();
  constructor(
    private navCtrl: NavController,
    private analyticsService: AnalyticsService
  ) {}

  goToTournament(tournament: Tournament): void {
    this.analyticsService.logEvent('myInscriptions_goToTournament', {
      tournament: tournament._id,
    });
    this.navCtrl.navigateForward(
      config.routes.tournament.replace(':id', tournament._id)
    );
  }

  clickCar(carId: string, tournamentId: string): void {
    if (this.item.tournament.status === 'Todo') {
      this.analyticsService.logEvent('myInscriptions_clickCarOptions', {
        car: carId,
      });
      this.openOptions.emit({ carId, tournamentId });
    } else {
      this.analyticsService.logEvent('myInscriptions_goToCar', { car: carId });
      this.navCtrl.navigateForward(config.routes.car.replace(':id', carId));
    }
  }
}
