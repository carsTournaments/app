import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IdDto } from 'src/app/core/dtos/id.dto';
import { Car } from 'src/app/models';
import { CarService, StorageService } from 'src/app/services';
import { GarageViewModel } from '../..';

@Component({
    selector: 'page-garage',
    templateUrl: 'garage.page.html',
    styleUrls: ['./garage.page.scss'],
})
export class GaragePage implements OnInit {
    vm = new GarageViewModel();
    constructor(
        private carService: CarService,
        private storageService: StorageService,
        private navCtrl: NavController
    ) {}

    async ngOnInit() {
        await this.getMyUser();
        this.getAllCars();
    }

    async getMyUser() {
        this.vm.user = await this.storageService.get('user');
    }

    getAllCars() {
        const body: IdDto = { id: this.vm.user._id };
        this.carService.getAllOfDriver(body).subscribe({
            next: (response) => (this.vm.cars = response),
            error: (error) => console.error(error),
        });
    }

    onClickCar(car: Car) {
        this.navCtrl.navigateForward(`/tab/account/garage/one/${car._id}`);
    }
}
