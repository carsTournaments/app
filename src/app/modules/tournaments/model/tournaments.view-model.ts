import { Tournament } from "src/app/models/tournament.model";
import { TournamentGetAllDto } from "src/app/services/tournament/tournament.dto"

export class TournamentsViewModel {
    title = 'Torneos';
    segments = {
        items: ['En curso', 'Proximos', 'Completados'],
        selected: 0
    }
    tournamentsBody: TournamentGetAllDto = {
        page: 1,
        pageSize: 10,
        site: 'app',
        order: ['created', 'desc']
    }
    tournaments: Tournament[] = [];
}