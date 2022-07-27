export class Vote {
  _id?: string;
  pairing: any; // PairingI;
  round: any;
  tournament: any;
  car: any; // CarI;
  user?: any;
  created?: string;
  updated?: string;

  constructor(data?: Vote) {
    this._id = data?._id;
    this.pairing = data?.pairing;
    this.round = data?.round;
    this.tournament = data?.tournament;
    this.car = data?.car;
    this.user = data?.user;
    this.created = data?.created;
    this.updated = data?.updated;
  }
}
