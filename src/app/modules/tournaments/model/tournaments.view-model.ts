import { Header } from '@components/header/model/header.model';
import { TournamentGetAllOfAllStatesResponse } from '@services/api/tournament/tournament.responses';

export class TournamentsViewModel {
    constructor() {}
    header = new Header({
        title: '',
    });
    tournaments: TournamentGetAllOfAllStatesResponse;
    loading = true;
    error = false;
}
