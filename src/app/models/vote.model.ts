export class Vote {
    _id?: string;
    pairing: string; // PairingI;
    car: string; // CarI;
    created?: string;
    updated?: string;

    constructor(data?: Vote) {
        this._id = data?._id;
        this.pairing = data?.pairing || '';
        this.car = data?.car || '';
        this.created = data?.created;
        this.updated = data?.updated;
    }
}
