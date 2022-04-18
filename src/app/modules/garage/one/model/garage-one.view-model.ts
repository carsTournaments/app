import { Header } from 'src/app/components/header/model/header.model';
import { Car, Brand } from 'src/app/models';
import { BrandGetAllDto } from 'src/app/services/api/brand/brand.dto';

export class GarageOneViewModel {
    header = new Header({
        title: 'Garage',
        backButton: {
            state: true,
            route: 'garage',
        },
    });
    id: string;
    car: Car = new Car();
    edit = true;
    brandsBody: BrandGetAllDto = {
        page: 1,
        pageSize: 100,
        site: 'app',
        order: ['name', 'asc'],
    };
    brands: Brand[] = [];
    brandIdSelected = '';
    loading = true;
    error = false;
}
