import { Image } from '@models';

export interface CarRankingI {
  _id: string;
  name: string;
  driver: string;
  images: Image[];
  // totals
  votes: number;
  pairings: number;
  pairingsWinners: number;
  tournamentsWinners: string;
  likes: number;
  inscriptions: number;
  state?: boolean;
  icon?: string;
}
