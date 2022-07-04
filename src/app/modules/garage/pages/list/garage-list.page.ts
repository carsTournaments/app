import { Component } from '@angular/core';
import {
    NavController,
    PopoverController,
    PopoverOptions,
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Car } from '@models';
import { TranslatePipe } from '@ngx-translate/core';
import {
    AlertService,
    CarService,
    UtilsService,
    UserService,
    ImageService,
} from '@services';
import { GaragePopoverComponent } from '../../components/popover/garage-popover.component';
import { GarageListViewModel } from '../../models/garage-list.view-model';

@Component({
    selector: 'page-garage-list',
    templateUrl: 'garage-list.page.html',
    styleUrls: ['./garage-list.page.scss'],
    providers: [TranslatePipe],
})
export class GarageListPage {
    vm = new GarageListViewModel();
    constructor(
        private carService: CarService,
        private navCtrl: NavController,
        private alertService: AlertService,
        private popoverCtrl: PopoverController,
        private imageService: ImageService,
        private userService: UserService,
        private utilsService: UtilsService,
        private translatePipe: TranslatePipe
    ) {}

    async ionViewWillEnter(): Promise<void> {
        this.getAllCars();
    }

    async getAllCars(): Promise<void> {
        this.vm.user = this.userService.getUser();
        this.vm.bodyCars.id = this.vm.user._id;
        this.carService.getAllOfDriver(this.vm.bodyCars).subscribe({
            next: (response) => {
                this.vm.cars = response;
                this.vm.loading = false;
                this.vm.error = false;
            },
            error: () => {
                this.vm.loading = false;
                this.vm.error = true;
            },
        });
    }

    async openPopover(e: any, car: Car): Promise<void> {
        const options: PopoverOptions = {
            component: GaragePopoverComponent,
            event: e,
            mode: 'ios',
            cssClass: 'popover-garage',
            reference: 'event',
        };
        const popover = await this.popoverCtrl.create(options);
        popover.present();
        popover
            .onDidDismiss()
            .then((data) => this.onDidDismissPopover(data, car));
    }

    onDidDismissPopover(data: OverlayEventDetail<any>, car: Car): void {
        if (data.data) {
            if (data.data === 'viewProfile') {
                this.navCtrl.navigateForward(`car/${car._id}`);
            } else if (data.data === 'edit') {
                this.editCar(car);
            } else if (data.data === 'image') {
                this.addImage(car);
            } else {
                this.deleteCar(car);
            }
        }
    }

    editCar(car: Car): void {
        this.navCtrl.navigateForward(`garage/one/${car._id}`);
    }

    async addImage(car: Car): Promise<void> {
        this.imageService.addNewToGallery('car', car._id).then(
            () => this.utilsService.reloadPage(),
            (error) => this.alertService.presentAlert('Error', error)
        );
    }

    async deleteCar(car: Car): Promise<void> {
        await this.alertService.presentAlertWithButtons(
            this.translatePipe.transform('garageList.titleDeleteCar'),
            this.translatePipe.transform('garageList.messageDeleteCar'),
            [
                {
                    text: this.translatePipe.transform('generic.no'),
                    role: 'cancel',
                },
                {
                    text: this.translatePipe.transform('generic.yes'),
                    handler: () => this.deleteCarConfirmation(car),
                },
            ]
        );
    }

    async deleteCarConfirmation(car: Car): Promise<void> {
        this.carService.delete(car._id).subscribe({
            next: () => {
                this.getAllCars();
                this.alertService.presentAlert(
                    this.translatePipe.transform(
                        'garageList.titleDeleteCarConfirmation'
                    ),
                    this.translatePipe.transform(
                        'garageList.messageDeleteCarConfirmation'
                    )
                );
            },
            error: (error) => {
                this.alertService.presentAlert('Error', error);
            },
        });
    }

    onClickAddCar(): void {
        this.navCtrl.navigateForward(`garage/create`);
    }
}
