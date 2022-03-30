import { TournamentService } from './../../services/tournament/tournament.service';
import { TournamentsViewModel } from './model/tournaments.view-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournaments',
  templateUrl: 'tournaments.page.html',
  styleUrls: ['tournaments.page.scss']
})
export class TournamentsPage implements OnInit {
  vm = new TournamentsViewModel();

  constructor(private tournamentService: TournamentService) { }
  
  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.tournamentService.getAll(this.vm.tournamentsBody).subscribe({
      next: (res) => this.vm.tournaments = res.items,
      error: (err) => console.log(err)
    })
  }

  segmentChanged(ev: any) {
    this.vm.segments.selected = Number(ev.detail.value);
  }
}
