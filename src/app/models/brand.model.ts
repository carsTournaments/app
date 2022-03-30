import { Car } from './car.model';
import { Image } from './image.model';

export class Brand {
    _id?: string;
    name: string;
    country: string;
    continent: string;
    cars?: Car[]; // Virtual
    image?: Image;
    created?: string;
    updated?: string;
    constructor(data?: Brand) {
        this._id = data?._id;
        this.name = data?.name || '';
        this.country = data?.country || '';
        this.continent = data?.continent || '';
        this.image = data?.image || new Image();
        this.cars = data?.cars || [];
        this.created = data?.created || '';
        this.updated = data?.updated || '';
    }
}
