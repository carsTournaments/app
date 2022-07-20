import { Header } from '@components/header/model/header.model';
import { Round } from '@models';
import { config } from '@config';

export class RoundsViewModel {
    header = new Header({
        title: 'Rondas',
        backButton: {
            state: true,
            route: config.routes.tournaments,
            default: true,
        },
    });
    tournamentId: string;
    rounds: Round[] = [];
    roundSelected = '';
    segmentsRounds = [];
}
