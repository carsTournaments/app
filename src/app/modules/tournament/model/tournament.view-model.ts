import { Header } from '@components/header/model/header.model';
import { Inscription, Tournament, User } from '@models';
import { InscriptionsGetMyCarsForInscriptionDto } from '@services/api/inscription/inscription.dto';
import { InscriptionGetMyCarsUserForInscriptionResponse } from '@services/api/inscription/inscription.responses';
import { WinnerGetOfTournamentComplete } from '@services/api/winner/winner.responses';

export class TournamentViewModel {
    id: string;
    user: User;
    header = new Header({
        title: 'Torneo',
        backButton: {
            state: true,
            route: '/tab/tournaments',
      },
      rightButton: {
        state: true,
        icon: 'arrow-redo-outline',
      },
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
