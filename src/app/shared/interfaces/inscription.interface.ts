import { Car, Tournament } from '@models';

export interface InscriptionGetAllForDriverI {
    todo: { tournament: Tournament; cars: Car[] }[];
    inProgress: { tournament: Tournament; cars: Car[] }[];
    completed: { tournament: Tournament; cars: Car[] }[];
}

export interface InscriptionGetAllForDriverItemI {
    tournament: Tournament;
    cars: Car[];
}
