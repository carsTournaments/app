import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tournament } from '@models';

@Component({
  selector: 'my-trophies-item-trophy',
  templateUrl: 'my-trophies-item-trophy.component.html',
  styleUrls: ['./my-trophies-item-trophy.component.scss'],
})
export class MyTrophiesItemTrophyComponent {
  @Input() type: string;
  @Input() tournament: Tournament;
  @Output() goToTournament: EventEmitter<string> = new EventEmitter<string>();
}
