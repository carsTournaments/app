import { Header } from 'src/app/components/header/model/header.model';
import { TournamentGetAllOfAllStatesResponse } from 'src/app/services/api/tournament/tournament.responses';

export class TournamentsViewModel {
    header = new Header({
        title: 'Torneos',
    });
    tournaments: TournamentGetAllOfAllStatesResponse;
    loading = true;
    error = false;
}
