import { Header } from 'src/app/components/header/model/header.model';
import { Tournament } from 'src/app/models';
import { TournamentGetAllOfAllStatesResponse } from 'src/app/services/api/tournament/tournament.responses';

export class TournamentsListViewModel {
    header = new Header({
        title: 'Torneos',
        segments: {
            items: ['En curso', 'Proximos', 'Completados'],
            selected: 0,
        },
    });
    tournaments: TournamentGetAllOfAllStatesResponse;
}
