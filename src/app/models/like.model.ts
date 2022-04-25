export class Like {
    _id?: string;
    car: any;
    user?: any;
    created?: string;
    updated?: string;

    constructor(data?: Like) {
        this._id = data?._id;
        this.car = data?.car || '';
        this.user = data?.user || '';
        this.created = data?.created;
        this.updated = data?.updated;
    }
}
