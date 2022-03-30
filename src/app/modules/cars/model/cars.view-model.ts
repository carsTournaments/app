import { Brand } from "src/app/models/brand.model";
import { Car } from "src/app/models/car.model";
import { BrandGetAllBrandsAndCarsDto } from "src/app/services/brand/brand.dto";
import { CarGetAllDto } from "src/app/services/car/car.dto";

export class CarsViewModel {
    title = 'Coches';
    segments = {
        items: ['Ultimos Coches', 'Marcas'],
        selected: 0
    }
    carsBody: CarGetAllDto = {
        page: 1,
        pageSize: 20,
        site: 'app',
        order: ['created', 'asc']
    }
    brandsBody: BrandGetAllBrandsAndCarsDto = {
        page: 1,
        pageSize: 20,
        order: ['name', 'asc']
    }
    cars: Car[] = [];
    brands: Brand[] = [];
    filter = false;
}