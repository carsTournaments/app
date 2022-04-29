import { Header } from 'src/app/components/header/model/header.model';
import { Brand, Car, Like } from 'src/app/models';
import { BrandGetAllBrandsAndCarsDto } from 'src/app/services/api/brand/brand.dto';
import { CarGetAllDto } from 'src/app/services/api/car/car.dto';

export class CarsViewModel {
    header = new Header({
        title: 'Coches',
        segments: {
            items: ['Ultimos', 'Top', 'Marcas'],
            selected: 0,
        },
    });
    carsBody: CarGetAllDto = {
        page: 1,
        pageSize: 20,
        site: 'app',
        order: ['created', 'desc'],
    };
    brandsBody: BrandGetAllBrandsAndCarsDto = {
        page: 1,
        pageSize: 20,
        order: ['name', 'asc'],
    };
    cars: Car[] = [];
    brands: Brand[] = [];
    topCars: Car[] = [];
    filter = false;
    loading = {
        getCars: true,
        getBrands: true,
        getTop: true,
    };
    error = {
        getCars: false,
        getBrands: false,
        getTop: true,
    };
}
