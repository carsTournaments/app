import { Component } from '@angular/core';
import { config } from '@config';
import { NavController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Car } from '@models';
import { TranslateService } from '@ngx-translate/core';
import {
  AlertService,
  CarService,
  UserService,
  ToastIonicService,
  ActionSheetIonicService,
} from '@services';
import { MyGarageListViewModel } from '../../models/my-garage-list.view-model';

@Component({
  selector: 'page-my-garage-list',
  templateUrl: 'my-garage-list.page.html',
  styleUrls: ['./my-garage-list.page.scss'],
})
export class MyGarageListPage {
  vm = new MyGarageListViewModel();
  constructor(
    private carService: CarService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private userService: UserService,
    private translate: TranslateService,
    private toastIonicService: ToastIonicService,
    private actionSheetService: ActionSheetIonicService
  ) {}

  ionViewWillEnter(): void {
    this.getAllCars();
  }

  async getAllCars(): Promise<void> {
    this.vm.user = this.userService.getUser();
    this.vm.bodyCars.id = this.vm.user._id;
    this.carService.getAllDriverCars(this.vm.bodyCars).subscribe({
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

  async openOptions(car: Car) {
    const buttons = [
      {
        text: this.translate.instant('garageList.viewProfile'),
        data: 'viewProfile',
        icon: 'eye-outline',
      },
      {
        text: this.translate.instant('garageList.editCar'),
        data: 'edit',
        icon: 'create-outline',
      },
      {
        text: this.translate.instant('garageList.images'),
        data: 'images',
        icon: 'images-outline',
      },
      {
        text: this.translate.instant('garageList.deleteCar'),
        data: 'deleteCar',
        icon: 'close-outline',
      },
    ];

    const as = await this.actionSheetService.present('Opciones', buttons);
    as.onDidDismiss().then((data) => this.onDidDismissOptions(data, car));
  }

  onDidDismissOptions(data: OverlayEventDetail<any>, car: Car): void {
    if (data.data) {
      if (data.data === 'viewProfile') {
        this.navCtrl.navigateForward(config.routes.car.replace(':id', car._id));
      } else if (data.data === 'edit') {
        this.editCar(car);
      } else if (data.data === 'images') {
        this.navCtrl.navigateForward(
          config.routes.myGarageImages.replace(':id', car._id)
        );
      } else if (data.data === 'deleteCar') {
        this.deleteCar(car);
      }
    }
  }

  editCar(car: Car): void {
    this.navCtrl.navigateForward(
      config.routes.myGarageOne.replace(':id', car._id)
    );
  }

  async deleteCar(car: Car): Promise<void> {
    await this.alertService.presentAlertWithButtons(
      this.translate.instant('garageList.titleDeleteCar'),
      this.translate.instant('garageList.messageDeleteCar'),
      [
        {
          text: this.translate.instant('generic.no'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('generic.yes'),
          role: 'ok',
          handler: () => this.deleteCarConfirmation(car),
        },
      ]
    );
  }

  async deleteCarConfirmation(car: Car): Promise<void> {
    this.carService.delete(car._id).subscribe({
      next: () => {
        this.getAllCars();
        this.toastIonicService.info(
          this.translate.instant('garageList.messageDeleteCarConfirmation')
        );
      },
      error: (error) => this.toastIonicService.error('Error: ' + error),
    });
  }

  onClickAddCar(): void {
    this.navCtrl.navigateForward(config.routes.myGarageCreate);
  }
}
