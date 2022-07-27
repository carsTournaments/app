import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '@models';
import { InscriptionGetMyCarsUserForInscriptionResponse } from '@services/api/inscription/inscription.responses';

@Component({
  selector: 'tournament-my-inscriptions',
  templateUrl: 'tournament-my-inscriptions.component.html',
  styleUrls: ['./tournament-my-inscriptions.component.scss'],
})
export class TournamentMyInscriptionsComponent {
  @Input() myCars: InscriptionGetMyCarsUserForInscriptionResponse;
  @Output() confirmDeleteInscriptionClick: EventEmitter<Car> =
    new EventEmitter();
}
