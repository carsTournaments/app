import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Header } from './model/header.model';

@Component({
    selector: 'custom-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() options: Header;
    @Output() segmentChanged: EventEmitter<any> = new EventEmitter();
    constructor() {}
}
