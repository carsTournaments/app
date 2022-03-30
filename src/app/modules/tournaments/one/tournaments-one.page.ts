import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from 'src/app/services/api/tournament/tournament.service';
import { TournamentsOneViewModel } from './model/tournaments-one.view-model';

@Component({
    selector: 'tournaments-one',
    templateUrl: 'tournaments-one.page.html',
    styleUrls: ['./tournaments-one.page.scss'],
})

export class TournamentsOnePage implements OnInit {
    vm = new TournamentsOneViewModel();
    constructor(private route: ActivatedRoute, private tournamentService: TournamentService) { }

    ngOnInit(): void {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.getOne();
    }

    getOne(): void {
        this.tournamentService.getOne(this.vm.id).subscribe({
            next: (data) => {
                this.vm.tournament = data;
                this.vm.header.title = data.name;
                this.vm.header.image = data.image;
                this.setSegments();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    setSegments() {
        if (this.vm.tournament.status === 'Todo') {
            this.vm.header.segments.items = ['Info', 'Inscripciones']
        } else if (this.vm.tournament.status === 'InProgress') {
            this.vm.header.segments.items = ['Info', 'Inscripciones', 'Rondas']
        } else if (this.vm.tournament.status === 'Completed') {
            this.vm.header.segments.items = ['Info', 'Rondas']
        }
    }

    segmentChanged(event: { detail: { value: any; }; }) {
        this.vm.header.segments.selected = Number(event.detail.value);
    }
}