import { Car } from '@models';

export interface InscriptionGetMyCarsUserForInscriptionResponse {
  inscribed: Car[];
  availables: Car[];
  unavailable: Car[];
}
