export class Report {
    _id?: string;
    userReporter: any;
    userReported: any;
    carReported: any;
    reason: string;
    state: boolean;
    created?: string;
    updated?: string;
    constructor(data?: Report) {
        this._id = data?._id;
        this.userReporter = data?.userReporter || '';
        this.userReported = data?.userReported || '';
        this.carReported = data?.carReported || '';
        this.reason = data?.reason || '';
        this.state = data?.state || false;
        this.created = data?.created || '';
        this.updated = data?.updated || '';
    }
}
