import { Vote, Pairing } from '.';

export class Round {
    _id?: string;
    name: string;
    participants: number;
    tournament: any; // TournamentI
    startDate: string;
    endDate: string;
    status: string;
    pairings?: Pairing[]; // Virtual
    votes?: Vote[];
    created?: string;
    updated?: string;
    constructor(data?: Round) {
        this._id = data?._id;
        this.name = data?.name || '';
        this.participants = data?.participants || 0;
        this.tournament = data?.tournament || null;
        this.startDate = data?.startDate || '';
        this.endDate = data?.endDate || '';
        this.status = data?.status || 'Todo';
        this.pairings = data?.pairings || [];
        this.votes = data?.votes || [];
        this.created = data?.created;
        this.updated = data?.updated;
    }
}
