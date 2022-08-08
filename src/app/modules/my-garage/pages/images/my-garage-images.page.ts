import { OverlayEventDetail } from '@ionic/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from '@models';
import {
  ActionSheetIonicService,
  AlertService,
  AnalyticsService,
  ImageService,
  ToastIonicService,
} from '@services';
import { ImageCarPipe } from '@pipes';
import { MyGarageImagesViewModel } from '../../models/my-garage-images.view-model';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';

@Component({
  selector: 'page-my-garage-images',
  templateUrl: 'my-garage-images.page.html',
  styleUrls: ['./my-garage-images.page.scss'],
  providers: [ImageCarPipe],
})
export class MyGarageImagesPage {
  vm = new MyGarageImagesViewModel();
  constructor(
    private imageService: ImageService,
    private toastIonicService: ToastIonicService,
    private route: ActivatedRoute,
    private imageCarPipe: ImageCarPipe,
    private translate: TranslateService,
    private alertService: AlertService,
    private analyticsService: AnalyticsService,
    private actionSheetService: ActionSheetIonicService
  ) {}
  ionViewWillEnter(): void {
    this.vm.id = this.route.snapshot.paramMap.get('id')!;
    this.getAllImagesCar();
  }

  getAllImagesCar() {
    this.imageService.getAllImagesCar(this.vm.id).subscribe({
      next: (response) => {
        this.vm.images = response;
        this.vm.loading = false;
      },
    });
  }

  async addImage(): Promise<void> {
    this.imageService.addNewToGallery('car', this.vm.id).then(
      () => {
        this.getAllImagesCar();
        this.toastIonicService.info('Imagen añadida');
      },
      () =>
        this.toastIonicService.error(
          'Error al añadir imagen, intentalo mas tarde'
        )
    );
  }

  getImage(image: Image): string {
    return this.imageCarPipe.transform([image]);
  }

  async openOptions(image: Image) {
    const buttons = [
      {
        text: this.translate.instant('garageImages.firstImage'),
        data: 'firstImage',
        icon: 'star-outline',
      },
      {
        text: this.translate.instant('garageImages.viewImage'),
        data: 'viewImage',
        icon: 'eye-outline',
      },
      {
        text: this.translate.instant('garageImages.deleteImage'),
        data: 'deleteImage',
        icon: 'close-outline',
      },
    ];

    if (this.vm.images.length === 1) {
      buttons.splice(0, 1);
    }

    const as = await this.actionSheetService.present('Opciones', buttons);
    as.onDidDismiss().then((data) => this.onDidDismissOptions(data, image));
  }

  onDidDismissOptions(data: OverlayEventDetail<any>, image: Image): void {
    if (data.data) {
      if (data.data === 'viewImage') {
        this.openImage(image);
      } else if (data.data === 'firstImage') {
        this.setFirstImage(image);
      } else if (data.data === 'deleteImage') {
        this.deleteImage(image);
      }
    }
  }

  openImage(image: Image): void {
    const url = `${environment.urlImages}/${image.url}`;
    this.analyticsService.logEvent('myGarageImages_openImage', {
      params: { url },
    });
    this.imageService.openImage(url);
  }

  setFirstImage(image: Image): void {
    this.imageService.setFirstImage(image._id, this.vm.id).subscribe({
      next: () => {
        this.getAllImagesCar();
        this.analyticsService.logEvent('myGarageImages_setFirstImage_OK');
        this.toastIonicService.info('Imagen actualizada');
      },
      error: () => {
        this.analyticsService.logEvent('myGarageImages_setFirstImage_KO');
        this.toastIonicService.error('Error al actualizar');
      },
    });
  }

  async deleteImage(image: Image): Promise<void> {
    const alert = await this.alertService.presentAlertWithButtons(
      this.translate.instant('garageImages.titleDeleteImage'),
      this.translate.instant('garageImages.messageDeleteImage'),
      [
        {
          text: this.translate.instant('generic.no'),
          role: 'cancel',
        },
        {
          text: this.translate.instant('generic.yes'),
          role: 'ok',
          handler: () => this.deleteImageConfirmation(image),
        },
      ]
    );

    alert.onDidDismiss().then(async (data) => this.onDidDismiss(data, image));
  }

  async onDidDismiss(
    data: OverlayEventDetail<any>,
    image: Image
  ): Promise<void> {
    if (data.role === 'ok') {
      this.analyticsService.logEvent('myGarageImages_deleteImage_Confirmation');
      this.deleteImageConfirmation(image);
    } else {
      this.analyticsService.logEvent('myGarageImages_deleteImage_Cancel');
    }
  }

  deleteImageConfirmation(image: Image) {
    if (this.vm.images.length === 2) {
      const firstImage = this.vm.images.filter(
        (img) => img._id !== image._id
      )[0];
      if (firstImage && !firstImage.firstImage) {
        this.imageService
          .update({
            _id: firstImage._id,
            firstImage: true,
            position: 0,
          })
          .subscribe(() => null);
      }
    }
    this.imageService.delete(image._id).subscribe({
      next: () => {
        this.analyticsService.logEvent('myGarageImages_deleteImage_OK');
        this.toastIonicService.info('Imagen eliminada');
        this.getAllImagesCar();
      },
      error: () => {
        this.analyticsService.logEvent('myGarageImages_deleteImage_KO');
        this.toastIonicService.error('Error al eliminar');
      },
    });
  }
}
