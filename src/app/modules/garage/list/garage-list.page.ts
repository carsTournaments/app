import { Component, OnInit } from '@angular/core';
import {
    NavController,
    PopoverController,
    PopoverOptions,
} from '@ionic/angular';
import { IdDto } from 'src/app/core/dtos/id.dto';
import { Car } from 'src/app/models';
import { AlertService, CarService, AuthService } from 'src/app/services';
import { ImageService } from 'src/app/services/api/image/image.service';
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
        private navCtrl: NavController,
        private alertService: AlertService,
        private popoverCtrl: PopoverController,
        private imageService: ImageService,
        private authService: AuthService
    ) {}

    async ngOnInit() {
        this.getAllCars();
    }

    async getAllCars() {
        this.vm.user = await this.authService.getUser();
        if (this.vm.user) {
            const body: IdDto = { id: this.vm.user._id };
            this.carService.getAllOfDriver(body).subscribe({
                next: (response) => (this.vm.cars = response),
                error: () => {
                    this.vm.loading = false;
                    this.vm.error = true;
                },
            });
        }
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
        };
        const popover = await this.popoverCtrl.create(options);
        popover.present();
        popover.onDidDismiss().then((data) => {
            if (data.data) {
                if (data.data === 'edit') {
                    this.goTo(data.data, car);
                } else if (data.data === 'image') {
                    this.addImage(car);
                } else {
                    this.deleteCar(car);
                }
            }
        });
    }

    goTo(type: string, car: Car) {
        if (type === 'edit') {
            this.navCtrl.navigateForward(`garage/one/${car._id}`);
        }
    }

    async addImage(car: Car): Promise<void> {
        this.vm.loading = true;
        this.imageService.addNewToGallery('car', car._id).then(
            () => {
                this.reloadPage();
                this.vm.loading = false;
            },
            (error) => {
                this.vm.loading = false;
                this.alertService.presentAlert('Error', error);
            }
        );
    }

    async deleteCar(car: Car): Promise<void> {
        await this.alertService.presentAlertWithButtons(
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
            },
        });
    }

    reloadPage(): void {
        window.location.reload();
    }
}
