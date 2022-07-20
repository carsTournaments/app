import { Component, Input } from '@angular/core';
import { Round } from '@models';

@Component({
  selector: 'round-info',
  templateUrl: 'round-info.component.html',
  styleUrls: ['round-info.component.scss'],
})

export class RoundInfoComponent {
  @Input() round: Round;
  constructor() { }

}
