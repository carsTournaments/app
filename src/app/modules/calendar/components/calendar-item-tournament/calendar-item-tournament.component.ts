import { Component, Input } from '@angular/core';
import { Round, Tournament } from '@models';

@Component({
  selector: 'calendar-item-tournament',
  templateUrl: 'calendar-item-tournament.component.html',
  styleUrls: ['./calendar-item-tournament.component.scss'],
})

export class CalendarItemTournamentComponent {
  @Input() tournament: Tournament;
  @Input() round: Round;
  @Input() startDate: string;
  @Input() endDate: string;

}
