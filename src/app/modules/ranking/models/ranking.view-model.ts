import { Header } from '@components/header/model/header.model';
import { CarRankingI } from '@interfaces';
import { CarGetGlobalRankingDto } from '@services/api/car/car.dto';
import { config } from '@config';

export class RankingViewModel {
    header = new Header({
        title: 'Ranking',
        backButton: {
            state: true,
            route: config.routes.tournaments,
            default: true,
        },
    });
    bodyRanking: CarGetGlobalRankingDto = {
        limit: 5,
        order: 'pairings',
    };
    ranking: CarRankingI[] = [];
    itemsOrder = [
        { name: 'Carreras', value: 'pairings' },
        { name: 'Victorias', value: 'pairingsWinners' },
        { name: 'Votos', value: 'votes' },
        { name: 'Oro/Plata/Bronce', value: 'tournamentsWinners' },
        { name: 'Me Gustas', value: 'likes' },
        { name: 'Inscripciones', value: 'inscriptions' },
    ];
    itemsOrderDefault = [
        { name: 'Carreras', value: 'pairings' },
        { name: 'Victorias', value: 'pairingsWinners' },
        { name: 'Votos', value: 'votes' },
        { name: 'Oro/Plata/Bronce', value: 'tournamentsWinners' },
        { name: 'Me Gustas', value: 'likes' },
        { name: 'Inscripciones', value: 'inscriptions' },
    ];
    loading = true;
}
