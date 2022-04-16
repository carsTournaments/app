import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { Zoom, Pagination, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

SwiperCore.use([Zoom]);

@Component({
    selector: 'viewer',
    templateUrl: 'viewer.component.html',
    styleUrls: ['./viewer.component.scss'],
})
export class ViewerComponent implements OnInit {
    @ViewChild('swiper') swiper: SwiperComponent;
    @Input() image: string;
    config: SwiperOptions = {
        zoom: {
            maxRatio: 10,
            minRatio: 0.2,
        },
    };
    constructor(private modalCtrl: ModalController) {}

    ngOnInit() {}

    close() {
        this.modalCtrl.dismiss();
    }

    zoom(zoomIn: any) {
        const zoom = this.swiper.swiperRef.zoom;
        zoomIn ? zoom.in() : zoom.out();
    }
}
