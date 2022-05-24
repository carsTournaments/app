import { Component } from '@angular/core';
import { AlertService, AuthService, InscriptionService } from '@services';
import { IdDto } from '@core/dtos/id.dto';
import {
    NavController,
    PopoverController,
    PopoverOptions,
} from '@ionic/angular';
import { InscriptionsViewModel } from './model/inscriptions.view-model';
import { Inscription } from '@models';
import { InscriptionsPopoverComponent } from './components/popover/inscriptions-popover.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
    selector: 'page-inscriptions',
    templateUrl: 'inscriptions.page.html',
    styleUrls: ['./inscriptions.page.scss'],
})
export class InscriptionsPage {
    vm = new InscriptionsViewModel();
    constructor(
        private inscriptionService: InscriptionService,
        private authService: AuthService,
        private navCtrl: NavController,
        private popoverCtrl: PopoverController,
        private alertService: AlertService
    ) {}

    async ionViewWillEnter() {
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
                this.checkStates();
                this.vm.loading = false;
            },
            error: () => {
                this.vm.loading = false;
                this.vm.error = true;
            },
        });
    }

    checkStates() {
        if (this.vm.inscriptions.inProgress.length === 0) {
            if (this.vm.inscriptions.completed.length === 0) {
                this.vm.states.todo = true;
            } else {
                this.vm.states.completed = true;
            }
        }
    }

    segmentChanged(ev: any): void {
        const segment = Number(ev.detail.value);
        this.vm.header.segments.selected = Number(segment);
    }

    goToTournament(inscription: Inscription): void {
        this.navCtrl.navigateForward(
            `tournament/${inscription.tournament._id}`
        );
    }

    async openPopover(body: {
        event;
        carId: string;
        tournamentId: string;
    }): Promise<void> {
        const options: PopoverOptions = {
            component: InscriptionsPopoverComponent,
            event: body.event,
            mode: 'ios',
            cssClass: 'popover-garage',
            reference: 'event',
        };
        const popover = await this.popoverCtrl.create(options);
        popover.present();
        popover
            .onDidDismiss()
            .then((data) =>
                this.onDidDismissPopover(data, body.carId, body.tournamentId)
            );
    }

    onDidDismissPopover(
        data: OverlayEventDetail<any>,
        carId: string,
        tournamentId: string
    ): void {
        if (data.data) {
            if (data.data === 'viewProfile') {
                this.navCtrl.navigateForward(`car/${carId}`);
            } else {
                this.deleteInscriptionConfirmation(carId, tournamentId);
            }
        }
    }

    async deleteInscriptionConfirmation(carId: string, tournamentId: string) {
        const alert = await this.alertService.presentAlertWithButtons(
            '¿Estás seguro?',
            'Vas a eliminar la inscripcion al torneo',
            [
                { text: 'No', role: 'cancel' },
                { text: 'Si', role: 'ok' },
            ]
        );
        alert.onDidDismiss().then(async (data) => {
            if (data.role === 'ok') {
                this.deleteInscription(carId, tournamentId);
            }
        });
    }

    deleteInscription(carId: string, tournamentId: string) {
        this.inscriptionService
            .deleteByCarAndTournament({ carId, tournamentId })
            .subscribe({
                next: () => {
                    this.getAll();
                },
                error: () => {
                    this.alertService.presentAlert(
                        'Error',
                        'No se pudo eliminar la inscripción'
                    );
                },
            });
    }
}
