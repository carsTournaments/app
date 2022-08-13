import { Component, Input } from '@angular/core';
import { Inscription, Like, Vote } from '@models';

@Component({
  selector: 'car-totals-divs',
  templateUrl: 'car-totals-divs.component.html',
  styleUrls: ['./car-totals-divs.component.scss'],
})
export class CarTotalsDivsComponent {
  @Input() states = {
    likes: false,
    inscriptions: false,
    votes: false,
  };
  @Input() likes: Like[];
  @Input() inscriptions: Inscription[];
  @Input() votes: Vote[];
}
