import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Header } from './model/header.model';

@Component({
    selector: 'custom-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() options: Header;
    @Output() segmentChanged: EventEmitter<any> = new EventEmitter();
    height: number;
    heightPx: string;
    constructor(private platform: Platform) {
        this.getHeightToolbar();
    }

    ngOnInit(): void {
        this.getHeightToolbar();
    }

    getHeightToolbar() {
        // if (
        //     !this.options?.segments ||
        //     this.options?.segments?.items.length === 0
        // ) {
        //     this.height = 60;
        // } else {
        //     this.height = 90;
        // }
        // if (this.platform.is('ios')) {
        //     // this.height += 20;
        // } else {
        //     this.heightPx = this.height + 'px';
        // }
    }
}
