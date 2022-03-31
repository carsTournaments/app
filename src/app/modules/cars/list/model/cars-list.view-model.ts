import { Header } from 'src/app/components/header/model/header.model';
import { Brand, Car } from 'src/app/models';
import { BrandGetAllBrandsAndCarsDto } from 'src/app/services/api/brand/brand.dto';
import { CarGetAllDto } from 'src/app/services/api/car/car.dto';

export class CarsListViewModel {
    header = new Header({
        title: 'Coches',
        segments: {
            items: ['Ultimos Coches', 'Marcas'],
            selected: 0,
        }
    }) 
    carsBody: CarGetAllDto = {
        page: 1,
        pageSize: 20,
        site: 'app',
        order: ['created', 'asc'],
    };
    brandsBody: BrandGetAllBrandsAndCarsDto = {
        page: 1,
        pageSize: 20,
        order: ['name', 'asc'],
    };
    cars: Car[] = [];
    brands: Brand[] = [];
    filter = false;
}
