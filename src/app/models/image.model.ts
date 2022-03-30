export class Image {
    _id?: string;
    type?: any; // car | tournament
    car?: any; // TournamentI
    tournamnet?: any; // TournamentI
    url?: string;
    created?: string;
    updated?: string;

    constructor(data?: Image) {
        this._id = data?._id;
        this.type = data?.type;
        this.car = data?.car;
        this.tournamnet = data?.tournamnet;
        this.url = data?.url;
        this.created = data?.created;
        this.updated = data?.updated;
    }
}
