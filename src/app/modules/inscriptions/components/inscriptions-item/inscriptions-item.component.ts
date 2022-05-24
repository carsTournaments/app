import { NavController } from '@ionic/angular';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car, Tournament } from '@models';

@Component({
    selector: 'inscriptions-item',
    templateUrl: 'inscriptions-item.component.html',
    styleUrls: ['./inscriptions-item.component.scss'],
})
export class InscriptionsItemComponent {
    @Input() item: {
        tournament: Tournament;
        cars: Car[];
    };
    @Output() openPopover: EventEmitter<{
        event: any;
        carId: string;
        tournamentId: string;
    }> = new EventEmitter();
    constructor(private navCtrl: NavController) {}

    goToTournament(tournament: Tournament): void {
        this.navCtrl.navigateForward(`/tournament/${tournament._id}`);
    }

    clickCar(e: any, carId: string, tournamentId: string): void {
        if (this.item.tournament.status === 'Todo') {
            this.openPopover.emit({
                event: e,
                carId,
                tournamentId,
            });
        } else {
            this.navCtrl.navigateForward(`/car/${carId}`);
        }
    }
}
