import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '@models';
import { InscriptionGetMyCarsUserForInscriptionResponse } from '@services/api/inscription/inscription.responses';

@Component({
  selector: 'tournament-my-cars',
  templateUrl: 'tournament-my-cars.component.html',
  styleUrls: ['./tournament-my-cars.component.scss'],
})
export class TournamentMyCarsomponent {
  @Input() completeInscriptions: boolean;
  @Input() statusTournament: string;
  @Input() myCars: InscriptionGetMyCarsUserForInscriptionResponse;
  @Output() inscriptionClick: EventEmitter<Car> = new EventEmitter();
  @Output() deleteInscriptionClick: EventEmitter<Car> = new EventEmitter();
}
