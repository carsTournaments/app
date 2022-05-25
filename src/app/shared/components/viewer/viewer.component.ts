import { ModalController } from '@ionic/angular';
import { Component, Input, ViewChild } from '@angular/core';
import SwiperCore, { Zoom, SwiperOptions } from 'swiper';

SwiperCore.use([Zoom]);

@Component({
    selector: 'viewer',
    templateUrl: 'viewer.component.html',
    styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent {
    @ViewChild('swiper') swiper: any;
    @Input() image: string;
    config: SwiperOptions = {
        zoom: {
            maxRatio: 10,
            minRatio: 0.2,
        },
    };
    constructor(private modalCtrl: ModalController) {}

    close() {
        this.modalCtrl.dismiss();
    }

    zoom(zoomIn: any) {
        const zoom = this.swiper.swiperRef.zoom;
        zoomIn ? zoom.in() : zoom.out();
    }
}
