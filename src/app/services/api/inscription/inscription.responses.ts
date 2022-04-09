import { Car } from './../../../models/car.model';

export interface InscriptionGetMyCarsUserForInscriptionResponse {
    inscribed: Car[];
    availables: Car[];
    notAvailables: Car[];
}
