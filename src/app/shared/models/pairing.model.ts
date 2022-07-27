export class Pairing {
  _id?: string;
  round: any; //RoundI;
  tournament: any;
  winner: string;
  car1: any;
  votes: any;
  car2: any;
  created?: string;
  updated?: string;

  constructor(data?: Pairing) {
    this._id = data?._id;
    this.round = data?.round;
    this.tournament = data?.tournament;
    this.winner = data?.winner;
    this.votes = data?.votes;
    this.car1 = data?.car1;
    this.car2 = data?.car2;
    this.created = data?.created;
    this.updated = data?.updated;
  }
}
