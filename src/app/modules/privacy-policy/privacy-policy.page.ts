import { Component, OnInit } from '@angular/core';
import { PrivacyPolicyViewModel } from './model/privacy-policy.view-model.model';

@Component({
    selector: 'page-privacy-policy',
    templateUrl: 'privacy-policy.page.html',
})
export class PrivacyPolicyPage implements OnInit {
    vm = new PrivacyPolicyViewModel();
    constructor() {}

    ngOnInit() {}
}
