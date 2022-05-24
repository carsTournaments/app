import { Header } from '@components/header/model/header.model';
import { NoItemsModel } from '@components/no-items/no-items.model';
import { Inscription, Tournament, User } from '@models';
import { InscriptionsGetMyCarsForInscriptionDto } from '@services/api/inscription/inscription.dto';
import { InscriptionGetMyCarsUserForInscriptionResponse } from '@services/api/inscription/inscription.responses';
import { WinnerGetOfTournamentComplete } from '@services/api/winner/winner.responses';

export class TournamentViewModel {
    id: string;
    user: User;
    header = new Header({
        title: 'Torneo',
        segments: {
            items: ['Info', 'Inscripciones', 'Rondas'],
            selected: 0,
        },
        backButton: {
            state: true,
            route: '/tab/tournaments',
        },
    });
    noitems = new NoItemsModel({
        title: 'No hay inscripciones',
        subtitle: 'Todavia nadie se ha inscrito, ¿no quieres ser el primero?',
    });
    tournament: Tournament;
    inscriptions: Inscription[] = [];
    image: string;
    buttonInscription = false;
    inscriptionsBody: InscriptionsGetMyCarsForInscriptionDto = {
        userId: '',
        tournamentId: '',
    };
    myCars: InscriptionGetMyCarsUserForInscriptionResponse;
    cols = '6';
    loading = {
        getOne: true,
        getInscriptionsOfTournament: true,
        getCarsUsersForInscription: true,
        getWinners: true,
    };
    error = {
        getOne: false,
        getInscriptionsOfTournament: false,
        getCarsUsersForInscription: false,
        getWinners: false,
    };
    winners: WinnerGetOfTournamentComplete;
}
