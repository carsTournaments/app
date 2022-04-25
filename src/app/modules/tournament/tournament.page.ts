import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetButton, IonContent, NavController } from '@ionic/angular';
import { Car, Inscription } from 'src/app/models';
import { ImagePipe } from 'src/app/pipes';
import {
    ActionSheetService,
    InscriptionService,
    TournamentService,
    AlertService,
    AuthService,
    WinnerService,
    ImageService,
} from 'src/app/services';
import { TournamentViewModel } from './model/tournament.view-model';

@Component({
    selector: 'page-tournament',
    templateUrl: 'tournament.page.html',
    styleUrls: ['./tournament.page.scss'],
})
export class TournamentPage implements OnInit {
    @ViewChild(IonContent, { static: false }) content: IonContent;
    vm = new TournamentViewModel();

    constructor(
        private route: ActivatedRoute,
        private tournamentService: TournamentService,
        private inscriptionService: InscriptionService,
        private authService: AuthService,
        private navCtrl: NavController,
        private imagePipe: ImagePipe,
        private actionSheetService: ActionSheetService,
        private alertService: AlertService,
        private winnerService: WinnerService,
        private imageService: ImageService
    ) {}

    async ngOnInit(): Promise<void> {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.vm.user = await this.authService.getUser();
        this.getOne();
        this.getInscriptionsOfTournament();
    }

    getOne(): void {
        this.vm.loading.getOne = true;
        this.tournamentService.getOne(this.vm.id).subscribe({
            next: (data) => {
                this.vm.tournament = data;
                this.vm.header.title = data.name;
                if (data.image) {
                    this.vm.image = this.imagePipe.transform(data.image.url);
                }
                this.vm.cols = this.vm.tournament.status === 'Todo' ? '4' : '6';
                this.setSegments();
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

    getInscriptionsOfTournament() {
        this.vm.loading.getInscriptionsOfTournament = true;
        this.inscriptionService
            .getAllOfTournament({ id: this.vm.id })
            .subscribe({
                next: (data) => {
                    this.vm.inscriptions = data;
                    this.checkButtonInscription();
                    this.vm.loading.getInscriptionsOfTournament = false;
                    this.vm.error.getInscriptionsOfTournament = false;
                },
                error: () => {
                    this.vm.loading.getInscriptionsOfTournament = false;
                    this.vm.error.getInscriptionsOfTournament = true;
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
                next: (data) => {
                    this.vm.myCars = data;
                    if (
                        this.vm.tournament.inscriptions.length ===
                            this.vm.tournament.maxParticipants ||
                        data.availables.length === 0
                    ) {
                        this.vm.buttonInscription = false;
                    } else {
                        this.vm.buttonInscription = true;
                    }
                    this.vm.loading.getCarsUsersForInscription = false;
                    this.vm.error.getCarsUsersForInscription = true;
                },
                error: () => {
                    this.vm.loading.getCarsUsersForInscription = false;
                    this.vm.error.getCarsUsersForInscription = true;
                },
            });
    }

    setSegments() {
        if (this.vm.tournament.status === 'Todo') {
            this.vm.header.segments.items = ['Info', 'Inscripciones'];
        } else if (this.vm.tournament.status === 'InProgress') {
            this.vm.header.segments.items = ['Info', 'Inscripciones', 'Rondas'];
        } else if (this.vm.tournament.status === 'Completed') {
            this.vm.header.segments.items = ['Info', 'Inscripciones', 'Rondas'];
        }
    }

    segmentChanged(event: { detail: { value: any } }) {
        this.vm.header.segments.selected = Number(event.detail.value);
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
                    error: (err) => {
                        this.vm.loading.getWinners = false;
                        this.vm.error.getWinners = true;
                    },
                });
        }
    }

    onClickCar(car: Car) {
        this.navCtrl.navigateForward(`/car/${car._id}`);
    }

    inscriptionCar() {
        if (this.vm.myCars.availables.length > 1) {
            const buttons: ActionSheetButton[] = [];
            for (const car of this.vm.myCars.availables) {
                buttons.push({
                    text: car.brand.name + ' ' + car.model,
                    handler: () => this.createInscription(car),
                });
            }
            this.actionSheetService.present('Elige el coche', buttons);
        } else if (this.vm.myCars.availables.length === 1) {
            this.inscriptionConfirmation(this.vm.myCars.availables[0]);
        }
    }

    inscriptionConfirmation(car: Car) {
        this.alertService.presentAlertWithButtons(
            'Confirmación',
            `¿Estás seguro de inscribirte en este torneo con el coche ${car.brand.name} ${car.model}?`,
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
        });
        this.inscriptionService.create(inscription).subscribe({
            next: (response) => {
                this.checkButtonInscription();
                this.getInscriptionsOfTournament();
                this.vm.tournament.inscriptions.push(response);
                this.alertService.presentAlert(
                    'Inscripción',
                    `Te has inscrito correctamente con el coche ${car.brand.name} ${car.model}`
                );
            },
            error: (err) => {
                this.alertService.presentAlert('Error', err);
                console.error(err);
            },
        });
    }

    confirmDeleteInscription(car: Car) {
        this.alertService.presentAlertWithButtons(
            'Confirmación',
            '¿Estás seguro de querer eliminar esta inscripción?',
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
                    this.getInscriptionsOfTournament();
                    this.getCarsUsersForInscription();
                    this.vm.tournament.inscriptions =
                        this.vm.tournament.inscriptions.filter(
                            (inscription) => inscription.car._id !== car._id
                        );
                    this.vm.tournament.inscriptions =
                        this.vm.tournament.inscriptions.filter(
                            (inscription) => inscription.car !== car._id
                        );
                    this.alertService.presentAlert(
                        'Inscripción',
                        `Se ha eliminado la inscripción correctamente`
                    );
                },
            });
    }

    goToRounds() {
        this.vm.header.segments.selected = 2;
        if (this.content) {
            this.content.scrollToTop(1500);
        }
    }

    openImage(image: string): void {
        this.imageService.openImage(image);
    }

    goToCar(car: Car): void {
        this.navCtrl.navigateForward(`/car/${car._id}`);
    }
}
