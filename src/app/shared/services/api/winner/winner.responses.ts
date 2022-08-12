import { Car, Tournament } from '@models';

export interface WinnerGetOfTournamentCompleteResponse {
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

export interface WinnerGetAllUserWinnersI {
  car: Car;
  gold: Tournament[];
  silver: Tournament[];
  bronze: Tournament[];
}
