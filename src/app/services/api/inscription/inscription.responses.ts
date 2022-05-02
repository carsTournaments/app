import { Car } from 'src/app/models';

export interface InscriptionGetMyCarsUserForInscriptionResponse {
    inscribed: Car[];
    availables: Car[];
    notAvailables: Car[];
}
