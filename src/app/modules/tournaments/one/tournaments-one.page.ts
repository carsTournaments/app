import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Car } from 'src/app/models';
import { ImagePipe } from 'src/app/pipes';
import { InscriptionService, TournamentService } from 'src/app/services';
import { TournamentsOneViewModel } from '..';

@Component({
    selector: 'tournaments-one',
    templateUrl: 'tournaments-one.page.html',
    styleUrls: ['./tournaments-one.page.scss'],
})

export class TournamentsOnePage implements OnInit {
    vm = new TournamentsOneViewModel();
    constructor(
        private route: ActivatedRoute,
        private tournamentService: TournamentService,
        private inscriptionService: InscriptionService,
        private navCtrl: NavController,
        private imagePipe: ImagePipe
    ) { }

    ngOnInit(): void {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.getOne();
        this.getInscriptionsOfTournament();
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
                console.log(err);
            }
        });
    }

    getInscriptionsOfTournament() {
        this.inscriptionService.getAllOfTournament({ id: this.vm.id }).subscribe({
            next: (data) => {
                this.vm.inscriptions = data;
            },
            error: (err) => {
                console.log(err);
            }
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
    }

    onClickCar(car: Car) {
        this.navCtrl.navigateForward(`/tab/cars/one/${car._id}`);
    }
}
