import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionItemI } from 'src/app/interfaces/option-item.interface';
import { User } from 'src/app/models';
import { UserGetResumeResponse } from 'src/app/services/api/user/user.responses';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
})
export class DashboardComponent {
    @Input() resume: UserGetResumeResponse;
    @Input() user: User;
    @Input() options: OptionItemI[];
    @Output() onClickOption: EventEmitter<OptionItemI> = new EventEmitter();
    constructor() {}
}
