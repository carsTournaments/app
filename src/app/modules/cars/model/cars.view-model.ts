import { Car } from "src/app/models/car.model";
import { CarGetAllDto } from "src/app/services/car/car.dto";

export class CarsViewModel {
    title = 'Coches';
    segments = {
        items: ['Ultimos Coches', 'Marcas'],
        selected: 0
    }
    tournamentsBody: CarGetAllDto = {
        page: 1,
        pageSize: 10,
        site: 'app',
        order: ['created', 'desc']
    }
    tournaments: Car[] = [];
}