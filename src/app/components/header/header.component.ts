import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Header } from './model/header.model';

@Component({
    selector: 'custom-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() options: Header;
    @Output() segmentChanged: EventEmitter<any> = new EventEmitter();
    @Output() clickRightIcon: EventEmitter<any> = new EventEmitter();
    height: number;
    heightPx: string;
    constructor() {}
}
