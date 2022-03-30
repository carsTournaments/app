export class Pairing {
  _id?: string;
  round: string; //RoundI;
  winner: string;
  car1: any;
  votes1: number;
  car2: any;
  votes2: number;
  created?: string;
  updated?: string;

  constructor(data?: Pairing) {
    this._id = data?._id;
    this.round = data?.round || '';
    this.winner = data?.winner || '';
    this.votes1 = data?.votes1 || 0;
    this.car1 = data?.car1 || null;
    this.votes2 = data?.votes2 || 0;
    this.car2 = data?.car2 || null;
    this.created = data?.created;
    this.updated = data?.updated;
  }
}
