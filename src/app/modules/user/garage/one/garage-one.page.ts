import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService, BrandService, AlertService } from 'src/app/services';
import { GarageOneViewModel } from './model/garage-one.view-model';

@Component({
    selector: 'page-garage-one',
    templateUrl: 'garage-one.page.html',
})
export class GarageOnePage implements OnInit {
    vm = new GarageOneViewModel();
    constructor(
        private carService: CarService,
        private brandService: BrandService,
        private route: ActivatedRoute,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.getAllBrands();
        if (this.vm.id) {
            this.getOne();
            this.vm.edit = true;
        } else {
            this.vm.edit = true;
        }
    }

    getOne() {
        this.carService.getOne(this.vm.id).subscribe({
            next: (data) => {
                this.vm.car = data;
                this.vm.brandIdSelected = this.vm.car.brand._id;
            },
            error: (err) => console.error(err),
        });
    }

    getAllBrands() {
        this.brandService.getAll(this.vm.brandsBody).subscribe({
            next: (data) => (this.vm.brands = data.items),
            error: (err) => console.error(err),
        });
    }

    updateItem() {
        this.vm.car.driver = this.vm.car.driver._id;
        this.vm.car.brand = this.vm.brandIdSelected;
        this.carService.update(this.vm.car).subscribe({
            next: (data) => {
                console.log(data);
                this.alertService.presentAlert(
                    '¡Vale!',
                    'El coche se actualizo correctamente'
                );
            },
            error: (err) => console.error(err),
        });
    }
}
