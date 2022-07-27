export interface CarRankingI {
  _id: string;
  name: string;
  driver: string;
  image: string;
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
