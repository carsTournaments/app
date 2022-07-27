export class Inscription {
  _id?: string;
  car: any; // CarI
  tournament: any; // TournamentI
  driver: any; // UserI
  created?: string;
  updated?: string;
  constructor(data?: Inscription) {
    this._id = data?._id;
    this.car = data?.car || '';
    this.tournament = data?.tournament || '';
    this.driver = data?.driver || '';
    this.created = data?.created || '';
    this.updated = data?.updated || '';
  }
}
