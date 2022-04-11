import { Car } from './../../models/car.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ModalController,
    ModalOptions,
    Platform,
    PopoverController,
    PopoverOptions,
} from '@ionic/angular';
import { PairingService } from 'src/app/services/api/pairing/pairing.service';
import { PairingViewModel } from './model/pairing.view-model';
import { PairingModalComponent } from './modal/pairing-modal.component';

@Component({
    selector: 'page-pairing',
    templateUrl: 'pairing.page.html',
    styleUrls: ['./pairing.page.scss'],
})
export class PairingPage implements OnInit {
    vm = new PairingViewModel();

    constructor(
        private route: ActivatedRoute,
        private pairingService: PairingService,
        private platform: Platform,
        private modalCtrl: ModalController
    ) {}

    async ngOnInit(): Promise<void> {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.getOne();
    }

    getOne() {
        this.pairingService.getOne(this.vm.id).subscribe({
            next: (item) => {
                this.vm.pairing = item;
                const height = this.platform.height() - 90;
                this.vm.totalHeight = height;
                this.vm.header.backButton.route = `tournament/${this.vm.pairing.tournament._id}`;
            },
            error: (error) => console.error(error),
        });
    }

    async openPopover(e: any, car: Car) {
        const options: ModalOptions = {
            component: PairingModalComponent,
            mode: 'ios',
            cssClass: 'modal-pairing',
            componentProps: {
                car,
            },
        };
        const popover = await this.modalCtrl.create(options);
        popover.present();
    }

    vote(type: string) {}
}
