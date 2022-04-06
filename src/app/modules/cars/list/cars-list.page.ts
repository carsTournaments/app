import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Brand, Car } from 'src/app/models';
import { BrandService, CarService } from 'src/app/services';
import { CarsListViewModel } from '..';

@Component({
    selector: 'app-cars-list',
    templateUrl: 'cars-list.page.html',
    styleUrls: ['cars-list.page.scss'],
})
export class CarsListPage implements OnInit {
    vm = new CarsListViewModel();

    constructor(
        private carService: CarService,
        private brandService: BrandService,
        private navCtrl: NavController
    ) {}

    ngOnInit() {
        this.getCars();
        this.getBrands();
    }

    getCars(event?: any) {
        this.carService.getAll(this.vm.carsBody).subscribe({
            next: (res) => this.getCarsOnSuccess(res, event),
            error: (err) => console.log(err),
        });
    }

    getCarsOnSuccess(res: any, event?: any) {
        if (event) {
            if (res.items.length > 0) {
                this.vm.cars = this.vm.cars.concat(res.items);
                event.target.complete();
            } else {
                event.target.disabled = true;
            }
        } else {
            this.vm.cars = res.items;
        }
    }

    getBrands(event?: any) {
        this.brandService.getAllBrandsAndCars(this.vm.brandsBody).subscribe({
            next: (res) => {
                if (event) {
                    if (res.items.length > 0) {
                        this.vm.brands = this.vm.brands.concat(res.items);
                        event.target.complete();
                    } else {
                        event.target.disabled = true;
                    }
                } else {
                    this.vm.brands = res.items;
                }
            },
            error: (err) => console.log(err),
        });
    }

    loadMoreData(event: any, type: string) {
        if (type === 'cars') {
            this.vm.carsBody.page++;
            this.getCars(event);
        } else {
            this.vm.brandsBody.page++;
            this.getBrands(event);
        }
    }

    segmentChanged(ev: any) {
        this.vm.header.segments.selected = Number(ev.detail.value);
    }

    onClickBrand(brand: Brand) {
        this.vm.carsBody.brand = brand._id;
        this.vm.carsBody.page = 1;
        this.vm.filter = true;
        this.vm.header.segments.selected = 0;
        this.getCars();
    }

    onClickCar(car: Car) {
        this.navCtrl.navigateForward(`/tab/cars/one/${car._id}`);
    }

    cleanFilter() {
        this.vm.carsBody.brand = null;
        this.vm.carsBody.page = 1;
        this.vm.filter = false;
        this.vm.header.segments.selected = 0;
        this.getCars();
    }
}
