import { Header } from '@components/header/model/header.model';
import { CarRankingI } from '@interfaces';
import { CarGetGlobalRankingDto } from '@services/api/car/car.dto';

export class RankingViewModel {
    header = new Header({
        title: 'Ranking',
        backButton: {
            state: true,
            route: 'tab/tournaments',
        },
    });
    bodyRanking: CarGetGlobalRankingDto = {
        limit: 10,
        order: ['votes', 'desc'],
    };
    ranking: CarRankingI[] = [];
}
