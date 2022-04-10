import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Header } from './model/header.model';

@Component({
    selector: 'custom-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() options: Header;
    @Output() segmentChanged: EventEmitter<any> = new EventEmitter();
    constructor(private router: Router, private navCtrl: NavController) {}

    ngOnInit() {}

    goToBack() {
        if (this.options.backButton && this.options.backButton.state) {
            console.log(this.router.getCurrentNavigation());
            this.navCtrl.navigateBack(this.options.backButton.route);
        }
    }
}
