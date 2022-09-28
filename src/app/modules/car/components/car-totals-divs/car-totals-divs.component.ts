import { Component, Input, OnInit } from '@angular/core';
import { Inscription, Like, Vote } from '@models';
import { InscriptionService, LikeService, VoteService } from '@services';

@Component({
  selector: 'car-totals-divs',
  templateUrl: 'car-totals-divs.component.html',
  styleUrls: ['./car-totals-divs.component.scss'],
})
export class CarTotalsDivsComponent implements OnInit {
  @Input() id: string;
  @Input() states = {
    likes: false,
    inscriptions: false,
    votes: false,
  };
  likes: Like[];
  votes: Vote[];
  inscriptions: Inscription[] = [];
  constructor(
    private inscriptionService: InscriptionService,
    private likeService: LikeService,
    private voteService: VoteService
  ) {}
  ngOnInit() {
    this.getInscriptions();
    this.getLikes();
    this.getVotes();
  }

  getInscriptions() {
    this.inscriptionService
      .getAllCarInscriptions({ id: this.id, limit: '5' })
      .subscribe({
        next: (data) => {
          this.inscriptions = data;
        },
      });
  }

  getLikes() {
    this.likeService.getAllCarLikes({ id: this.id, limit: '5' }).subscribe({
      next: (data) => {
        this.likes = data;
      },
    });
  }

  getVotes() {
    this.voteService.getAllCarVotes({ id: this.id, limit: '5' }).subscribe({
      next: (data) => {
        this.votes = data;
      },
    });
  }
}
