import { Component, OnInit } from '@angular/core';
import { AuthService, InscriptionService } from 'src/app/services';
import { IdDto } from 'src/app/core/dtos/id.dto';
import { NavController } from '@ionic/angular';
import { InscriptionsViewModel } from './model/inscriptions.view-model';
import { Inscription } from 'src/app/models';

@Component({
    selector: 'page-inscriptions',
    templateUrl: 'inscriptions.page.html',
    styleUrls: ['./inscriptions.page.scss'],
})
export class InscriptionsPage implements OnInit {
    vm = new InscriptionsViewModel();
    constructor(
        private inscriptionService: InscriptionService,
        private authService: AuthService,
        private navCtrl: NavController
    ) {}

    async ngOnInit() {
        await this.getUser();
        this.getAll();
    }

    async getUser() {
        this.vm.user = await this.authService.getUser();
    }

    getAll() {
        const body: IdDto = {
            id: this.vm.user._id,
        };
        this.inscriptionService.getAllForDriver(body).subscribe({
            next: (inscriptions) => {
                this.vm.inscriptions = inscriptions;
                this.setSegments();
                this.vm.loading = false;
            },
            error: () => {
                this.vm.loading = false;
                this.vm.error = true;
            },
        });
    }

    setSegments() {
        const items = [];
        if (this.vm.inscriptions.todo.length > 0) {
            items.push('Proximos');
        } else if (this.vm.inscriptions.inProgress.length > 0) {
            items.push('En curso');
        } else if (this.vm.inscriptions.completed.length > 0) {
            items.push('Finalizados');
        }
        if (items.length > 0) {
            this.vm.header.segments = {
                items: items,
                selected: 0,
            };
        }
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
