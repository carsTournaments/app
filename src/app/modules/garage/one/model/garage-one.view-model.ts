import { Header } from '@components/header/model/header.model';
import { Car, Brand } from '@models';
import { BrandGetAllDto } from '@services/api/brand/brand.dto';

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
