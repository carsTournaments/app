import { Component, OnInit } from '@angular/core';
import {
    NavController,
    PopoverController,
    PopoverOptions,
} from '@ionic/angular';
import { IdDto } from 'src/app/core/dtos/id.dto';
import { Car } from 'src/app/models';
import { AlertService, CarService, StorageService } from 'src/app/services';
import { GaragePopoverComponent } from '../popover/garage-popover.component';
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
        private navCtrl: NavController,
        private alertService: AlertService,
        private popoverCtrl: PopoverController
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

    onClickAddCar() {
        this.navCtrl.navigateForward(`garage/create`);
    }

    async openPopover(e: any, car: Car) {
        const options: PopoverOptions = {
            component: GaragePopoverComponent,
            event: e,
            mode: 'ios',
            cssClass: 'popover-garage',
            reference: 'event',
            // componentProps: {
            //     cars: this.vm.cars,
            // },
        };
        const popover = await this.popoverCtrl.create(options);
        popover.present();
        popover.onDidDismiss().then((data) => {
            if (data.data) {
                if (data.data === 'edit' || data.data === 'image') {
                    this.goTo(data.data, car);
                } else {
                    this.deleteCar(car);
                }
            }
        });
    }

    goTo(type: string, car: Car) {
        switch (type) {
            case 'edit':
                this.navCtrl.navigateForward(`garage/one/${car._id}`);
                break;
            case 'image':
                break;
        }
    }

    deleteCar(car: Car) {
        this.alertService.presentAlertWithButtons(
            '¡Oye!',
            '¿Estás seguro de eliminar este coche?',
            [
                { text: 'No', role: 'cancel' },
                { text: 'Sí', handler: () => this.deleteCarConfirmation(car) },
            ]
        );
    }

    deleteCarConfirmation(car: Car) {
        this.carService.delete(car._id).subscribe({
            next: () => {
                this.getAllCars();
                this.alertService.presentAlert(
                    '¡Eliminado!',
                    'El coche ha sido eliminado correctamente'
                );
            },
            error: (error) => {
                this.alertService.presentAlert('Error', error);
                console.error(error);
            },
        });
    }
}
