import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { config } from '@config';
import { IonContent, NavController } from '@ionic/angular';
import { Car, Inscription } from '@models';
import { TranslateService } from '@ngx-translate/core';
import { ImagePipe } from '@pipes';
import {
  InscriptionService,
  TournamentService,
  AlertService,
  WinnerService,
  ImageService,
  AnalyticsService,
  UtilsService,
  UserService,
  SocialSharingService,
  ToastIonicService,
} from '@services';
import { InscriptionGetMyCarsUserForInscriptionResponse } from '@services/api/inscription/inscription.responses';
import { TournamentViewModel } from '../../model/tournament.view-model';

@Component({
  selector: 'page-tournament',
  templateUrl: 'tournament.page.html',
})
export class TournamentPage {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  vm = new TournamentViewModel();

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService,
    private inscriptionService: InscriptionService,
    private userService: UserService,
    private navCtrl: NavController,
    private imagePipe: ImagePipe,
    private alertService: AlertService,
    private winnerService: WinnerService,
    private imageService: ImageService,
    private analyticsService: AnalyticsService,
    private utilsService: UtilsService,
    private translate: TranslateService,
    private socialSharingService: SocialSharingService,
    private toastIonicService: ToastIonicService
  ) {}

  async ionViewWillEnter(): Promise<void> {
    this.vm.id = this.route.snapshot.paramMap.get('id')!;
    this.vm.user = this.userService.getUser();
    this.getOne();
    this.checkButtonInscription();
  }

  getOne(): void {
    this.vm.loading.getOne = true;
    this.tournamentService.getOne(this.vm.id).subscribe({
      next: (data) => {
        this.vm.tournament = data;
        this.vm.header.title = this.utilsService.truncateText(data.name, 20);
        if (data.image) {
          this.vm.image = this.imagePipe.transform(data.image.url);
        }
        this.getWinners();
        this.vm.loading.getOne = false;
        this.vm.error.getOne = false;
      },
      error: () => {
        this.vm.loading.getOne = false;
        this.vm.error.getOne = true;
      },
    });
  }

  async checkButtonInscription() {
    if (
      this.vm.tournament?.status === 'InProgress' ||
      this.vm.tournament?.status === 'Completed' ||
      !this.vm.user
    ) {
      this.vm.buttonInscription = false;
    } else {
      await this.getCarsUsersForInscription();
    }
  }

  async getCarsUsersForInscription() {
    this.vm.loading.getCarsUsersForInscription = true;
    this.vm.inscriptionsBody.tournamentId = this.vm.id;
    this.vm.inscriptionsBody.userId = this.vm.user._id;
    this.inscriptionService
      .getMyCarsForInscription(this.vm.inscriptionsBody)
      .subscribe({
        next: (data) => this.getCarsUsersForInscriptionOnSuccess(data),
        error: () => {
          this.vm.loading.getCarsUsersForInscription = false;
          this.vm.error.getCarsUsersForInscription = true;
        },
      });
  }

  getCarsUsersForInscriptionOnSuccess(
    data: InscriptionGetMyCarsUserForInscriptionResponse
  ) {
    this.vm.myCars = data;
    if (
      (this.vm.tournament?.inscriptions &&
        this.vm.tournament?.inscriptions.length ===
          this.vm.tournament.maxParticipants) ||
      data.availables.length === 0
    ) {
      this.vm.buttonInscription = false;
    } else {
      this.vm.buttonInscription = true;
    }
    this.vm.loading.getCarsUsersForInscription = false;
    this.vm.error.getCarsUsersForInscription = false;
  }

  scrollToTop() {
    if (this.content) {
      this.content.scrollToTop(1500);
    }
  }

  getWinners() {
    if (this.vm.tournament.status === 'Completed') {
      this.vm.loading.getWinners = true;
      this.winnerService
        .getForTournamentComplete({ id: this.vm.id })
        .subscribe({
          next: (data) => {
            this.vm.winners = data;
            this.vm.loading.getWinners = false;
            this.vm.error.getWinners = false;
          },
          error: () => {
            this.vm.loading.getWinners = false;
            this.vm.error.getWinners = true;
          },
        });
    }
  }

  inscriptionConfirmation(car: Car) {
    this.alertService.presentAlertWithButtons(
      this.translate.instant('tournament.inscriptionConfirmationTitle'),
      `${this.translate.instant('tournament.inscriptionConfirmationMessage')} ${
        car.brand.name
      } ${car.model}?`,
      [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => this.createInscription(car),
        },
      ]
    );
  }

  createInscription(car: Car) {
    const inscription = new Inscription({
      car: car._id,
      tournament: this.vm.id,
      driver: this.vm.user._id,
    });
    this.inscriptionService.create(inscription).subscribe({
      next: (response) => {
        this.analyticsService.logEvent(
          'tournament_createInscriptionConfirmation_OK'
        );
        this.checkButtonInscription();
        this.vm.tournament.inscriptions.push(response);
        const message = `${this.translate.instant(
          'tournament.inscriptionOkMessage'
        )} ${car.brand.name} ${car.model}`;
        this.toastIonicService.info(message);
      },
      error: (error) => {
        this.analyticsService.logEvent(
          'tournament_createInscriptionConfirmation_KO'
        );
        this.toastIonicService.error(error ?? 'Error al crear la inscripci??n');
      },
    });
  }

  confirmDeleteInscription(car: Car) {
    this.alertService.presentAlertWithButtons(
      this.translate.instant('tournament.inscriptionDeleteConfirmationTitle'),
      this.translate.instant('tournament.inscriptionDeleteConfirmationMessage'),
      [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => this.deleteInscription(car),
        },
      ]
    );
  }

  deleteInscription(car: Car) {
    this.inscriptionService
      .deleteByCarAndTournament({
        carId: car._id,
        tournamentId: this.vm.id,
      })
      .subscribe({
        next: () => {
          this.checkButtonInscription();
          this.getCarsUsersForInscription();
          this.vm.tournament.inscriptions =
            this.vm.tournament.inscriptions.filter(
              (inscription: Inscription) => inscription.car._id !== car._id
            );
          this.vm.tournament.inscriptions =
            this.vm.tournament.inscriptions.filter(
              (inscription: Inscription) => inscription.car !== car._id
            );
          this.toastIonicService.info(
            this.translate.instant('tournament.inscriptionDeleteOkMessage')
          );
          this.analyticsService.logEvent('tournament_deleteInscription_OK');
        },
        error: () => {
          this.analyticsService.logEvent('tournament_deleteInscription_KO');
          this.toastIonicService.error('Error al eliminar la inscripci??n');
        },
      });
  }

  onClickOption(event: string) {
    if (event === 'goToRounds') {
      this.goToRounds();
    } else {
      this.goToInscriptions();
    }
  }

  goToRounds() {
    this.analyticsService.logEvent('tournament_goToRounds');
    this.navCtrl.navigateForward(
      config.routes.rounds.replace(':id', this.vm.id)
    );
  }

  goToInscriptions() {
    this.analyticsService.logEvent('tournament_goToInscriptions');
    this.navCtrl.navigateForward(
      config.routes.inscriptions.replace(':id', this.vm.id)
    );
  }

  openImage(image: string): void {
    this.analyticsService.logEvent('tournament_openImage', {
      params: { image },
    });
    this.imageService.openImage(image);
  }

  goToCar(car: Car): void {
    this.analyticsService.logEvent('tournament_goToCar');
    this.navCtrl.navigateForward(config.routes.car.replace(':id', car._id));
  }

  share() {
    this.analyticsService.logEvent('tournament_share');
    this.socialSharingService.share(
      `${this.vm.tournament.name}`,
      `https://www.carstournaments.com/tournament/${this.vm.id}`
    );
  }
}
