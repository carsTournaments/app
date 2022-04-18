import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Brand, Car } from 'src/app/models';
import { BrandService, CarService } from 'src/app/services';
import { CarsViewModel } from './model/cars.view-model';

@Component({
    selector: 'page-cars',
    templateUrl: 'cars.page.html',
    styleUrls: ['./cars.page.scss'],
})
export class CarsPage implements OnInit {
    vm = new CarsViewModel();

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
        this.vm.loading.getCars = true;
        this.carService.getAll(this.vm.carsBody).subscribe({
            next: (res) => this.getCarsOnSuccess(res, event),
            error: () => {
                this.vm.loading.getCars = false;
                this.vm.error.getCars = true;
            },
        });
    }

    getCarsOnSuccess(res: { items: Car[] }, event?: any) {
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
        this.vm.loading.getCars = false;
        this.vm.error.getCars = false;
    }

    getBrands(event?: any) {
        this.vm.loading.getBrands = true;
        this.brandService.getAllBrandsAndCars(this.vm.brandsBody).subscribe({
            next: (res) => this.getBrandsOnSuccess(res, event),
            error: () => {
                this.vm.loading.getBrands = false;
                this.vm.error.getBrands = true;
            },
        });
    }

    getBrandsOnSuccess(res: { items: Brand[] }, event?: any) {
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
        this.vm.loading.getBrands = false;
        this.vm.error.getBrands = false;
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
        this.navCtrl.navigateForward(`/car/${car._id}`);
    }

    cleanFilter() {
        this.vm.carsBody.brand = null;
        this.vm.carsBody.page = 1;
        this.vm.filter = false;
        this.vm.header.segments.selected = 0;
        this.getCars();
    }

    doRefresh(event: any) {
        this.getCars(event);
    }
}
