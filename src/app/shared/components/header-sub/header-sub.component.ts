import { Component, Input } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
    selector: 'custom-header-sub',
    templateUrl: 'header-sub.component.html',
    styleUrls: ['./header-sub.component.scss'],
})
export class HeaderSubComponent {
    @Input() title: string;
    @Input() buttons = false;
    constructor(public platform: Platform) {}
}
