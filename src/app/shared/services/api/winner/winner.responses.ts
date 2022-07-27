import { Car } from '@models';

export interface WinnerGetOfTournamentComplete {
  gold: {
    car: Car;
    votes: number;
  };
  silver: {
    car: Car;
    votes: number;
  };
  bronze: {
    car: Car;
    votes: number;
  };
}
