import { Inscription } from './../../models/inscription.model';
import { Component, OnInit } from '@angular/core';
import { InscriptionService, StorageService } from 'src/app/services';
import { User } from 'src/app/models';
import { IdDto } from 'src/app/core/dtos/id.dto';
import { NavController } from '@ionic/angular';
import { InscriptionsViewModel } from './model/inscriptions.view-model';

@Component({
    selector: 'page-inscriptions',
    templateUrl: 'inscriptions.page.html',
    styleUrls: ['./inscriptions.page.scss'],
})
export class InscriptionsPage implements OnInit {
    vm = new InscriptionsViewModel();
    constructor(
        private inscriptionService: InscriptionService,
        private storageService: StorageService,
        private navCtrl: NavController
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
            next: (inscriptions) => {
                this.vm.inscriptions = inscriptions;
                this.setSegments();
            },
            error: (error) => console.error(error),
        });
    }

    setSegments() {
        if (this.vm.inscriptions.todo.length > 0) {
            this.vm.header.segments.items.push('Proximos');
        } else if (this.vm.inscriptions.inProgress.length > 0) {
            this.vm.header.segments.items.push('En curso');
        } else if (this.vm.inscriptions.completed.length > 0) {
            this.vm.header.segments.items.push('Finalizados');
        }
        this.vm.header.segments.selected = 0;
    }

    segmentChanged(event: any) {
        this.vm.header.segments.selected = event.detail.value;
    }

    goToTournament(inscription: Inscription) {
        this.navCtrl.navigateForward(
            `tournament/${inscription.tournament._id}`
        );
    }
}
