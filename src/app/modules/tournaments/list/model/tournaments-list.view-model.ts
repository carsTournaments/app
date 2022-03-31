import { Header } from "src/app/components/header/model/header.model";
import { Tournament } from "src/app/models";
import { TournamentGetAllDto } from "src/app/services/api/tournament/tournament.dto";

export class TournamentsListViewModel {
    header = new Header({
        title: 'Torneos',
        segments: {
            items: ['En curso', 'Proximos', 'Completados'],
            selected: 0,
        }
    });
    tournamentsBody: TournamentGetAllDto = {
        page: 1,
        pageSize: 10,
        site: 'app',
        order: ['created', 'desc'],
    };
    tournamentsTodo: Tournament[] = [];
    tournamentsInProgress: Tournament[] = [];
    tournamentsCompleted: Tournament[] = [];
}
