import { Component } from '@angular/core';
import {
  ActionSheetIonicService,
  AlertService,
  InscriptionService,
  ToastIonicService,
  UserService,
} from '@services';
import { IdDto } from '@core/dtos/id.dto';
import { NavController } from '@ionic/angular';
import { Inscription } from '@models';
import { OverlayEventDetail } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { MyInscriptionsViewModel } from '../../model/my-inscriptions.view-model';
import { config } from '@config';

@Component({
  selector: 'page-my-inscriptions',
  templateUrl: 'my-inscriptions.page.html',
  styleUrls: ['./my-inscriptions.page.scss'],
})
export class MyInscriptionsPage {
  vm = new MyInscriptionsViewModel();
  constructor(
    private inscriptionService: InscriptionService,
    private userService: UserService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private translate: TranslateService,
    private toastIonicService: ToastIonicService,
    private actionSheetService: ActionSheetIonicService
  ) {}

  async ionViewWillEnter() {
    this.translateItems();
    this.vm.user = this.userService.getUser();
    this.getAll();
  }

  translateItems() {
    this.vm.header.title = this.translate.instant('inscriptions.title');
    this.vm.noitems.title = this.translate.instant('inscriptions.titleNoItems');
    this.vm.noitems.subtitle = this.translate.instant(
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

  // async openPopover(body: {
  //   event: any;
  //   carId: string;
  //   tournamentId: string;
  // }): Promise<void> {
  //   const options: PopoverOptions = {
  //     component: MyInscriptionsPopoverComponent,
  //     event: body.event,
  //     mode: 'ios',
  //     cssClass: 'popover-garage',
  //     reference: 'event',
  //   };
  //   const popover = await this.popoverCtrl.create(options);
  //   popover.present();
  //   popover
  //     .onDidDismiss()
  //     .then((data) =>
  //       this.onDidDismissPopover(data, body.carId, body.tournamentId)
  //     );
  // }

  async openOptions(data: { carId: string; tournamentId: string }) {
    const buttons = [
      {
        text: this.translate.instant('inscriptions.viewProfile'),
        data: 'viewProfile',
        icon: 'star-outline',
      },
      {
        text: this.translate.instant('inscriptions.deleteInscription'),
        data: 'deleteInscription',
        icon: 'close-outline',
      },
    ];

    const as = await this.actionSheetService.present('Opciones', buttons);
    as.onDidDismiss().then((res) => this.onDidDismissOptions(res, data));
  }

  onDidDismissOptions(
    res: OverlayEventDetail<any>,
    data: {
      carId: string;
      tournamentId: string;
    }
  ): void {
    if (res.data) {
      if (res.data === 'viewProfile') {
        this.navCtrl.navigateForward(
          config.routes.car.replace(':id', data.carId)
        );
      } else if (res.data === 'deleteInscription') {
        this.deleteInscriptionConfirmation(data.carId, data.tournamentId);
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
        error: () =>
          this.toastIonicService.error('Error al eliminar la inscripcion'),
      });
  }
}
