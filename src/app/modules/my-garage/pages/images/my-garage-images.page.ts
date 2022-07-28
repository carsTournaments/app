import { OverlayEventDetail } from '@ionic/core';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from '@models';
import {
  AlertService,
  AnalyticsService,
  ImageService,
  ToastIonicService,
} from '@services';
import { ImageCarPipe } from '@pipes';
import { MyGarageImagesViewModel } from '../../models/my-garage-images.view-model';
import { PopoverController, PopoverOptions } from '@ionic/angular';
import { MyGarageImagePopoverComponent } from '../../components/popover-image/my-garage-image-popover.component';
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
    private popoverCtrl: PopoverController,
    private translate: TranslateService,
    private alertService: AlertService,
    private analyticsService: AnalyticsService
  ) {}
  ionViewWillEnter(): void {
    this.getAllImagesCar();
  }

  ngOnInit() {
    this.vm.id = this.route.snapshot.paramMap.get('id')!;
    if (this.vm.id) {
    }
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

  async openPopover(e: any, image: Image): Promise<void> {
    const options: PopoverOptions = {
      component: MyGarageImagePopoverComponent,
      event: e,
      mode: 'ios',
      cssClass: 'popover-garage',
      reference: 'event',
    };
    const popover = await this.popoverCtrl.create(options);
    popover.present();
    popover
      .onDidDismiss()
      .then((data) => this.onDidDismissPopover(data, image));
  }

  onDidDismissPopover(data: OverlayEventDetail<any>, image: Image): void {
    if (data.data) {
      if (data.data === 'viewImage') {
        this.openImage(image);
      } else if (data.data === 'firstImage') {
        this.setFirstImage(image);
      } else {
        this.deleteImage(image);
      }
    }
  }

  openImage(image: Image): void {
    const url = `${environment.urlImages}/${image.url}`;
    this.analyticsService.logEvent('car_openImage', { params: { url } });
    this.imageService.openImage(url);
  }

  setFirstImage(image: Image): void {
    this.imageService.setFirstImage(image._id, this.vm.id).subscribe({
      next: () => {
        this.getAllImagesCar();
        this.toastIonicService.info('Imagen actualizada');
      },
      error: () => this.toastIonicService.error('Error al actualizar'),
    });
  }

  async deleteImage(image: Image): Promise<void> {
    await this.alertService.presentAlertWithButtons(
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
  }

  deleteImageConfirmation(image: Image) {
    if (this.vm.images.length === 2) {
      const firstImage = this.vm.images.filter(
        (img) => img._id !== image._id
      )[0];
      console.log(firstImage);
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
    this.imageService.deleteOne(image._id).subscribe({
      next: () => {
        this.toastIonicService.info('Imagen eliminada');
        this.getAllImagesCar();
      },
    });
  }
}
