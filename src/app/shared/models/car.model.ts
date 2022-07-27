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
  likes?: { count: number };
  lastLike?: string;
  gold?: { count: number };
  silver?: { count: number };
  bronze?: { count: number };
  inscriptions?: { count: number };
  votes?: { count: number };
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
    this.stock = data?.stock ?? true;
    this.info = data?.info;
    this.year = data?.year;
    this.tournaments = data?.tournaments;
    this.image = data?.image;
    this.liked = data?.liked;
    this.likes = data?.likes;
    this.lastLike = data?.lastLike;
    this.gold = data?.gold;
    this.silver = data?.silver;
    this.bronze = data?.bronze;
    this.inscriptions = data?.inscriptions;
    this.votes = data?.votes;
    this.created = data?.created;
    this.updated = data?.updated;
  }
}
