import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { UserGetResumeResponse } from 'src/app/services/api/user/user.responses';

@Component({
    selector: 'dashboard-resume',
    templateUrl: 'dashboard-resume.component.html',
    styleUrls: ['./dashboard-resume.component.scss'],
})
export class DashboardResumeComponent implements OnInit {
    @Input() resume: UserGetResumeResponse;
    @Input() user: User;
    constructor() {}

    ngOnInit() {}
}
