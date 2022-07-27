export interface InscriptionGetAllDto {
  page: number;
  pageSize: number;
  site: string;
  order: string[];
}

export interface InscriptionCreateDto {
  car: string;
  tournament: string;
}

export interface InscriptionsGetMyCarsForInscriptionDto {
  userId: string;
  tournamentId: string;
}

export interface InscriptionGetAllOfCarDto {
  id: string;
  limit: string;
}
