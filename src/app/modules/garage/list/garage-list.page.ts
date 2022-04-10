import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IdDto } from 'src/app/core/dtos/id.dto';
import { Car } from 'src/app/models';
import { CarService, StorageService } from 'src/app/services';
import { GarageListViewModel } from './model/garage-list.view-model';

@Component({
    selector: 'page-garage-list',
    templateUrl: 'garage-list.page.html',
    styleUrls: ['./garage-list.page.scss'],
})
export class GarageListPage implements OnInit {
    vm = new GarageListViewModel();
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
        this.navCtrl.navigateForward(`garage/one/${car._id}`);
    }

    onClickAddCar() {
        this.navCtrl.navigateForward(`garage/create`);
    }
}
