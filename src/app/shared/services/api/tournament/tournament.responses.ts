import { Tournament } from '@models';

export interface TournamentGetAllOfAllStatesResponse {
  todo: Tournament[];
  inProgress: Tournament[];
  completed: Tournament[];
}
