import { Component } from '@angular/core';
import {
  ActionSheetIonicService,
  AlertService,
  AnalyticsService,
  InscriptionService,
  ToastIonicService,
  UserService,
} from '@services';
import { IdDto } from '@core/dtos/id.dto';
import { NavController } from '@ionic/angular';
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
    private actionSheetService: ActionSheetIonicService,
    private analyticsService: AnalyticsService
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
    this.inscriptionService.getAllDriverInscriptions(body).subscribe({
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
        this.analyticsService.logEvent('myInscriptions_goToCarTodo', {
          carId: data.carId,
        });
        this.navCtrl.navigateForward(
          config.routes.car.replace(':id', data.carId)
        );
      } else if (res.data === 'deleteInscription') {
        this.analyticsService.logEvent('myInscriptions_deleteInscription', {
          carId: data.carId,
          tournamentId: data.tournamentId,
        });
        this.deleteInscriptionConfirmation(data.carId, data.tournamentId);
      }
    }
  }

  async deleteInscriptionConfirmation(carId: string, tournamentId: string) {
    const alert = await this.alertService.presentAlertWithButtons(
      '¿Estás seguro?',
      'Vas a eliminar la inscripcion al torneo',
      [
        {
          text: this.translate.instant('generic.no'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('generic.yes'),
          role: 'ok',
        },
      ]
    );
    alert.onDidDismiss().then(async (data) => {
      if (data.role === 'ok') {
        this.analyticsService.logEvent(
          'myInscriptions_deleteInscriptionConfirmation',
          { carId, tournamentId }
        );
        this.deleteInscription(carId, tournamentId);
      } else {
        this.analyticsService.logEvent(
          'myInscriptions_deleteInscriptionCancelled',
          { carId, tournamentId }
        );
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
