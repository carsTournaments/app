import { CarRankingI } from "@interfaces";
import { CarGetGlobalRankingDto } from "@services/api/car/car.dto";

export class RankingViewModel {
  bodyRanking: CarGetGlobalRankingDto = {
    limit: 10,
    order: ['votes', 'desc']
  };
  ranking: CarRankingI[] = []
}
