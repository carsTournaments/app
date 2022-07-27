import { Component } from '@angular/core';
import { config } from '@config';
import {
  NavController,
  PopoverController,
  PopoverOptions,
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Car } from '@models';
import { TranslateService } from '@ngx-translate/core';
import {
  AlertService,
  CarService,
  UtilsService,
  UserService,
  ImageService,
  ToastIonicService,
} from '@services';
import { GaragePopoverComponent } from '../../components/popover/garage-popover.component';
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
    private popoverCtrl: PopoverController,
    private imageService: ImageService,
    private userService: UserService,
    private utilsService: UtilsService,
    private translate: TranslateService,
    private toastIonicService: ToastIonicService
  ) {}

  async ionViewWillEnter(): Promise<void> {
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
    popover.onDidDismiss().then((data) => this.onDidDismissPopover(data, car));
  }

  onDidDismissPopover(data: OverlayEventDetail<any>, car: Car): void {
    if (data.data) {
      if (data.data === 'viewProfile') {
        this.navCtrl.navigateForward(config.routes.car.replace(':id', car._id));
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
    this.navCtrl.navigateForward(
      config.routes.myGarageOne.replace(':id', car._id)
    );
  }

  async addImage(car: Car): Promise<void> {
    this.imageService.addNewToGallery('car', car._id).then(
      () => this.utilsService.reloadPage(),
      () =>
        this.toastIonicService.error(
          'Error al añadir imagen, intentalo mas tarde'
        )
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
