import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Round, Tournament } from '@models';

@Component({
    selector: 'calendar-item-tournament',
    templateUrl: 'calendar-item-tournament.component.html',
    styleUrls: ['./calendar-item-tournament.component.scss'],
})
export class CalendarItemTournamentComponent {
    @Output() clickItem = new EventEmitter<Tournament>();
    @Input() tournament: Tournament;
    @Input() round: Round;
    @Input() startDate: string;
    @Input() endDate: string;
}
