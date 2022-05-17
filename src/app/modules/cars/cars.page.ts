import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Brand, Car } from 'src/app/models';
import {
    ActionSheetService,
    AnalyticsService,
    BrandService,
    CarService,
    LikeService,
} from 'src/app/services';
import { CarsViewModel } from './model/cars.view-model';

@Component({
    selector: 'page-cars',
    templateUrl: 'cars.page.html',
    styleUrls: ['./cars.page.scss'],
})
export class CarsPage {
    vm = new CarsViewModel();

    constructor(
        private carService: CarService,
        private likeService: LikeService,
        private brandService: BrandService,
        private navCtrl: NavController,
        private analyticsService: AnalyticsService,
        private actionSheetService: ActionSheetService
    ) {}

    ionViewWillEnter(): void {
        this.getCars();
        this.getTopSites();
        this.getBrands();
    }

    getCars(event?: any): void {
        this.vm.loading.getCars = true;
        this.carService.getAll(this.vm.carsBody).subscribe({
            next: (res) => this.getCarsOnSuccess(res, event),
            error: () => {
                this.vm.loading.getCars = false;
                this.vm.error.getCars = true;
                this.vm.noitems.subtitle = this.vm.filter
                    ? 'Pulsa sobre la X para eliminar el filtro'
                    : 'Algo por aqui no ha ido bien...';
            },
        });
    }

    getCarsOnSuccess(res: { items: Car[] }, event?: any): void {
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

    getTopSites(): void {
        this.vm.loading.getTop = true;
        this.likeService.getTopCars('25').subscribe({
            next: (res) => {
                this.vm.topCars = res;
                this.vm.loading.getTop = false;
                this.vm.error.getTop = false;
            },
            error: () => {
                this.vm.loading.getTop = false;
                this.vm.error.getTop = true;
            },
        });
    }

    getBrands(event?: any): void {
        this.vm.loading.getBrands = true;
        this.brandService.getAllBrandsAndCars(this.vm.brandsBody).subscribe({
            next: (res) => this.getBrandsOnSuccess(res, event),
            error: () => {
                this.vm.loading.getBrands = false;
                this.vm.error.getBrands = true;
            },
        });
    }

    getBrandsOnSuccess(res: { items: Brand[] }, event?: any): void {
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

    loadMoreData(event: any, type: string): void {
        if (type === 'cars') {
            this.analyticsService.logEvent('cars_loadMoreCars');
            this.vm.carsBody.page++;
            this.getCars(event);
        } else {
            this.analyticsService.logEvent('cars_loadMoreBrands');
            this.vm.brandsBody.page++;
            this.getBrands(event);
        }
    }

    segmentChanged(ev: any): void {
        this.analyticsService.logEvent('tournaments_segmentChanged', {
            params: { segment: ev.detail.value },
        });
        this.vm.header.segments.selected = Number(ev.detail.value);
        this.vm.header.rightButton.state =
            this.vm.header.segments.selected === 0 ||
            this.vm.header.segments.selected === 2
                ? true
                : false;
    }

    onClickBrand(brand: Brand): void {
        this.vm.carsBody.brand = brand._id;
        this.vm.carsBody.page = 1;
        this.vm.filter = true;
        this.vm.header.segments.selected = 0;
        this.getCars();
    }

    goToCar(item: Car): void {
        this.analyticsService.logEvent('cars_goToCar', {
            params: {
                car_id: item._id,
                car_name: `${item.brand.name} ${item.model}`,
            },
        });
        this.navCtrl.navigateForward(`/car/${item._id}`);
    }

    cleanFilter(): void {
        this.analyticsService.logEvent('cars_cleanFilter');
        this.vm.carsBody.brand = null;
        this.vm.carsBody.page = 1;
        this.vm.filter = false;
        this.vm.header.segments.selected = 0;
        this.getCars();
    }

    doRefresh(event: any): void {
        this.analyticsService.logEvent('cars_refresh');
        this.getCars(event);
    }

    async openFilter() {
        const buttons = [
            {
                text: !this.vm.carsBody.onlyWithPhoto
                    ? 'Ver solo coches con foto'
                    : 'Ver todos los coches',
                data: !this.vm.carsBody.onlyWithPhoto ? 'onlyWithPhoto' : 'all',
            },
        ];
        const as = await this.actionSheetService.present('Filtro', buttons);

        as.onDidDismiss().then((data) => {
            if (data) {
                if (data.data === 'onlyWithPhoto' || data.data === 'all') {
                    this.vm.carsBody.onlyWithPhoto =
                        data.data === 'onlyWithPhoto' ? true : false;
                    this.vm.brandsBody.onlyWithPhoto =
                        data.data === 'onlyWithPhoto' ? true : false;
                    this.vm.carsBody.page = 1;
                    this.vm.brandsBody.page = 1;
                    this.getCars();
                    this.getBrands();
                }
            }
        });
    }
}
