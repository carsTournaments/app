import { Component, Input } from '@angular/core';
import { User } from '@models';

@Component({
  selector: 'car-driver',
  templateUrl: 'car-driver.component.html',
    styleUrls: ['./car-driver.component.scss'],
})
export class CarDriverComponent {
    @Input() driver: User;
}
