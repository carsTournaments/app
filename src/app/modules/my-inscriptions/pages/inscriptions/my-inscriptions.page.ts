import { Component } from '@angular/core';
import { AlertService, InscriptionService, UserService } from '@services';
import { IdDto } from '@core/dtos/id.dto';
import {
    NavController,
    PopoverController,
    PopoverOptions,
} from '@ionic/angular';
import { Inscription } from '@models';
import { OverlayEventDetail } from '@ionic/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MyInscriptionsPopoverComponent } from '../../components/my-inscriptions-popover/my-inscriptions-popover.component';
import { MyInscriptionsViewModel } from '../../model/my-inscriptions.view-model';
import { config } from '@config';

@Component({
    selector: 'page-my-inscriptions',
    templateUrl: 'my-inscriptions.page.html',
    styleUrls: ['./my-inscriptions.page.scss'],
    providers: [TranslatePipe],
})
export class MyInscriptionsPage {
    vm = new MyInscriptionsViewModel();
    constructor(
        private inscriptionService: InscriptionService,
        private userService: UserService,
        private navCtrl: NavController,
        private popoverCtrl: PopoverController,
        private alertService: AlertService,
        private translatePipe: TranslatePipe
    ) {}

    async ionViewWillEnter() {
        this.translate();
        this.vm.user = this.userService.getUser();
        this.getAll();
    }

    translate() {
        this.vm.header.title =
            this.translatePipe.transform('inscriptions.title');
        this.vm.noitems.title = this.translatePipe.transform(
            'inscriptions.titleNoItems'
        );
        this.vm.noitems.subtitle = this.translatePipe.transform(
            'inscriptions.subtitleNoItems'
        );
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
            config.routes.tournament.replace(':id', inscription.tournament._id)
        );
    }

    async openPopover(body: {
        event: any;
        carId: string;
        tournamentId: string;
    }): Promise<void> {
        const options: PopoverOptions = {
            component: MyInscriptionsPopoverComponent,
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
                this.navCtrl.navigateForward(
                    config.routes.car.replace(':id', carId)
                );
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