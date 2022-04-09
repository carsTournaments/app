import { Tournament } from 'src/app/models';

export interface TournamentGetAllOfAllStatesResponse {
    todo: Tournament[];
    inProgress: Tournament[];
    completed: Tournament[];
}
