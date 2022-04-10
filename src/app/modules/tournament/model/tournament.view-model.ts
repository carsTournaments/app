import { Header } from 'src/app/components/header/model/header.model';
import { Inscription, Tournament, User } from 'src/app/models';
import { InscriptionsGetMyCarsForInscriptionDto } from 'src/app/services/api/inscription/inscription.dto';
import { InscriptionGetMyCarsUserForInscriptionResponse } from 'src/app/services/api/inscription/inscription.responses';

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
    tournament: Tournament;
    inscriptions: Inscription[] = [];
    image: string;
    buttonInscription = false;
    inscriptionsBody: InscriptionsGetMyCarsForInscriptionDto = {
        userId: '',
        tournamentId: '',
    };
    myCars: InscriptionGetMyCarsUserForInscriptionResponse;
}
