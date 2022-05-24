import { Header } from 'src/app/components/header/model/header.model';
import { NoItemsModel } from 'src/app/components/no-items/no-items.model';
import { Brand, Car } from 'src/app/models';
import { BrandGetAllBrandsAndCarsDto } from 'src/app/services/api/brand/brand.dto';
import { CarGetAllDto } from 'src/app/services/api/car/car.dto';

export class CarsViewModel {
    header = new Header({
        title: 'Coches',
        segments: {
            items: ['Ultimos', 'Top', 'Marcas'],
            selected: 0,
        },
        rightButton: {
            icon: 'filter',
            state: true,
        },
    });
    carsBody: CarGetAllDto = {
        page: 1,
        pageSize: 20,
        site: 'app',
        order: ['created', 'desc'],
        onlyWithPhoto: false,
    };
    noitems = new NoItemsModel({
        title: '¡No hay ningun coche disponible!',
        subtitle: '',
    });
    brandsBody: BrandGetAllBrandsAndCarsDto = {
        page: 1,
        pageSize: 20,
        order: ['name', 'asc'],
        onlyWithPhoto: false,
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
