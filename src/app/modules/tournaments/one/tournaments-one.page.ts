import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetButton, IonContent, NavController } from '@ionic/angular';
import { Car, User, Inscription } from 'src/app/models';
import { ImagePipe } from 'src/app/pipes';
import {
    ActionSheetService,
    InscriptionService,
    TournamentService,
    StorageService,
    AlertService,
} from 'src/app/services';
import { TournamentsOneViewModel } from '..';

@Component({
    selector: 'tournaments-one',
    templateUrl: 'tournaments-one.page.html',
    styleUrls: ['./tournaments-one.page.scss'],
})
export class TournamentsOnePage implements OnInit {
    vm = new TournamentsOneViewModel();
    @ViewChild(IonContent, { static: false }) content: IonContent;

    constructor(
        private route: ActivatedRoute,
        private tournamentService: TournamentService,
        private inscriptionService: InscriptionService,
        private storageService: StorageService,
        private navCtrl: NavController,
        private imagePipe: ImagePipe,
        private actionSheetService: ActionSheetService,
        private alertService: AlertService
    ) {}

    async ngOnInit(): Promise<void> {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.getOne();
        this.getInscriptionsOfTournament();
        this.vm.user = await this.storageService.get<User>('user');
    }

    getOne(): void {
        this.tournamentService.getOne(this.vm.id).subscribe({
            next: (data) => {
                this.vm.tournament = data;
                this.vm.header.title = data.name;
                if (data.image) {
                    this.vm.image = this.imagePipe.transform(data.image.url);
                }
                this.setSegments();
            },
            error: (err) => {
                console.error(err);
            },
        });
    }

    getInscriptionsOfTournament() {
        this.inscriptionService
            .getAllOfTournament({ id: this.vm.id })
            .subscribe({
                next: (data) => {
                    this.vm.inscriptions = data;
                    this.checkButtonInscription();
                },
                error: (err) => {
                    console.error(err);
                },
            });
    }

    async checkButtonInscription() {
        if (
            this.vm.tournament.status === 'InProgress' ||
            this.vm.tournament.status === 'Completed'
        ) {
            this.vm.buttonInscription = false;
        } else {
            await this.getCarsUsersForInscription();
        }
    }

    async getCarsUsersForInscription() {
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
                },
                error: (err) => {
                    console.error(err);
                },
            });
    }

    setSegments() {
        if (this.vm.tournament.status === 'Todo') {
            this.vm.header.segments.items = ['Info', 'Inscripciones'];
        } else if (this.vm.tournament.status === 'InProgress') {
            this.vm.header.segments.items = ['Info', 'Inscripciones', 'Rondas'];
        } else if (this.vm.tournament.status === 'Completed') {
            this.vm.header.segments.items = ['Info', 'Rondas'];
        }
    }

    segmentChanged(event: { detail: { value: any } }) {
        this.vm.header.segments.selected = Number(event.detail.value);
        this.content.scrollToTop(1500);
    }

    onClickCar(car: Car) {
        this.navCtrl.navigateForward(`/tab/cars/one/${car._id}`);
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
            '¿Estás seguro de inscribirte en este torneo?',
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
        this.content.scrollToTop(1500);
    }
}
