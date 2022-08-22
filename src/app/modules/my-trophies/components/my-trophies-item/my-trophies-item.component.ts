import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tournament } from '@models';
import { WinnerGetAllUserWinnersI } from '@services/api/winner/winner.responses';
import { ImageCarPipe } from '@shared/pipes';

@Component({
  selector: 'my-trophies-item',
  templateUrl: 'my-trophies-item.component.html',
  styleUrls: ['./my-trophies-item.component.scss'],
  providers: [ImageCarPipe],
})
export class MyTrophiesItemComponent {
  @Input() item: WinnerGetAllUserWinnersI;
  @Input() tournament: Tournament;
  @Input() open = false;
  backgroundImage: string;
  @Output() goToTournament: EventEmitter<string> = new EventEmitter<string>();
}
