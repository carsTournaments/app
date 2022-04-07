import { Component, OnInit } from '@angular/core';
import { InscriptionService, StorageService } from 'src/app/services';
import { InscriptionsViewModel } from '..';
import { User } from 'src/app/models';
import { IdDto } from 'src/app/core/dtos/id.dto';

@Component({
    selector: 'page-inscriptions',
    templateUrl: 'inscriptions.page.html',
    styleUrls: ['./inscriptions.page.scss'],
})
export class InscriptionsPage implements OnInit {
    vm = new InscriptionsViewModel();
    constructor(
        private inscriptionService: InscriptionService,
        private storageService: StorageService
    ) {}

    async ngOnInit() {
        await this.getUser();
        this.getAll();
    }

    async getUser() {
        this.vm.user = await this.storageService.get<User>('user');
    }

    getAll() {
        const body: IdDto = {
            id: this.vm.user._id,
        };
        this.inscriptionService.getAllForDriver(body).subscribe({
            next: (inscriptions) => (this.vm.inscriptions = inscriptions),
            error: (error) => console.error(error),
        });
    }
}
