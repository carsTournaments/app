import { CarService } from 'src/app/services';
import { Observable, of } from 'rxjs';
import { IdDto } from 'src/app/core/dtos/id.dto';
import { PaginatorI } from 'src/app/interfaces/paginator.interface';
import { Car } from 'src/app/models';
import { environment } from 'src/environments/environment';

export class CarServiceMock {
    url = `${environment.urlApi}/cars`;
    car = new Car();

    getAll(): Observable<{ items: Car[]; paginator: PaginatorI }> {
        return of({
            items: [],
            paginator: {
                pageSize: 1,
                currentPage: 1,
                totalPages: 1,
                total: 1,
            },
        });
    }

    getAllOffBrand(data: IdDto): Observable<Car[]> {
        return of([]);
    }

    getAllOfDriver(data: IdDto): Observable<Car[]> {
        return of([]);
    }

    getOne(id: string): Observable<Car> {
        this.car._id = id;
        return of(this.car);
    }

    create(data: Car): Observable<Car> {
        return of(this.car);
    }

    update(data: Car): Observable<Car> {
        return of(this.car);
    }

    delete(id: string): Observable<Car> {
        return of(this.car);
    }
}
