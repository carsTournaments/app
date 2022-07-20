import { Header } from '@components/header/model/header.model';
import { NoItemsModel } from '@components/no-items/no-items.model';
import { Brand, Car } from '@models';
import { BrandGetAllBrandsAndCarsDto } from '@services/api/brand/brand.dto';
import { CarGetAllDto } from '@services/api/car/car.dto';

export class CarsViewModel {
    header = new Header({
        title: '',
        segments: {
            items: ['Coches', 'Marcas'],
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
    filter = false;
    loading = {
        getCars: true,
        getBrands: true,
    };
    error = {
        getCars: false,
        getBrands: false,
    };
}
