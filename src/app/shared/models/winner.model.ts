export class Winner {
    _id?: string;
    tournament: any;
    gold: any; // CarI;
    silver: any; // CarI;
    bronze: any; // CarI;
    updated?: string;
    created?: string;

    constructor(data?: Winner) {
        this._id = data?._id;
        this.tournament = data?.tournament || '';
        this.gold = data?.gold || '';
        this.silver = data?.silver || '';
        this.bronze = data?.bronze || '';
        this.updated = data?.updated;
        this.created = data?.created;
    }
}
