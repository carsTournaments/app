import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PairingService } from 'src/app/services/api/pairing/pairing.service';
import { PairingViewModel } from './model/pairing.view-model';

@Component({
    selector: 'page-pairing',
    templateUrl: 'pairing.page.html',
    styleUrls: ['./pairing.page.scss'],
})
export class PairingPage implements OnInit {
    vm = new PairingViewModel();

    constructor(
        private route: ActivatedRoute,
        private pairingService: PairingService
    ) {}

    async ngOnInit(): Promise<void> {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.getOne();
    }

    getOne() {
        this.pairingService.getOne(this.vm.id).subscribe({
            next: (item) => {
                this.vm.pairing = item;
            },
            error: (error) => console.error(error),
        });
    }
}
