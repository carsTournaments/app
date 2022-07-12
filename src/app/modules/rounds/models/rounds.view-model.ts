import { Header } from '@components/header/model/header.model';
import { Round } from '@models';

export class RoundsViewModel {
    header = new Header({
        title: 'Rondas',
        backButton: {
            state: true,
            route: '/tab/tournaments',
        },
    });
    tournamentId: string;
    rounds: Round[] = [];
    roundSelected = '';
    segmentsRounds = [];
}
