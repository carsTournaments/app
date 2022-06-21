import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionItemI } from '@interfaces';
import { User } from '@models';
import { UserGetResumeResponse } from '@services/api/user/user.responses';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    @Input() resume: UserGetResumeResponse;
    @Input() user: User;
    @Input() options: OptionItemI[];
    @Output() goTo: EventEmitter<OptionItemI> = new EventEmitter();
}
