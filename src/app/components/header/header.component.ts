import { Header } from './model/header.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'custom-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    @Input() options: Header;
    @Output() segmentChanged: EventEmitter<string> = new EventEmitter();
    constructor(private navCtrl: NavController) { }

    ngOnInit() { }

    goToBack() {
        this.navCtrl.pop()
    }
}