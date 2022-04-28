import { Image } from './image.model';
import { Tournament } from './tournament.model';

export class Car {
    _id?: string;
    driver: any; // UserI
    brand: any; // BrandI
    model: string;
    fuel: string;
    traction: string;
    cv: number;
    cc: number;
    stock: boolean;
    info: string;
    year: number;
    tournaments?: Tournament[];
    image?: any;
    liked?: boolean;
    winners?: {
        gold: number;
        silver: number;
        bronze: number;
    };
    created?: string;
    updated?: string;

    constructor(data?: Car) {
        this._id = data?._id;
        this.driver = data?.driver;
        this.brand = data?.brand;
        this.model = data?.model;
        this.fuel = data?.fuel;
        this.traction = data?.traction;
        this.cv = data?.cv;
        this.cc = data?.cc;
        this.stock = data?.stock || true;
        this.info = data?.info;
        this.year = data?.year;
        this.tournaments = data?.tournaments;
        this.image = data?.image;
        this.liked = data?.liked;
        this.winners = data?.winners;
        this.created = data?.created;
        this.updated = data?.updated;
    }
}
