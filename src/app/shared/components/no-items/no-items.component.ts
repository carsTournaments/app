import { Component, Input } from '@angular/core';
import { NoItemsModel } from './no-items.model';

@Component({
    selector: 'no-items',
    templateUrl: './no-items.component.html',
    styleUrls: ['./no-items.component.scss'],
})
export class NoItemsComponent {
    @Input() options: NoItemsModel;
}
