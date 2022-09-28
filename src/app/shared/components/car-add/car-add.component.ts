import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Brand, Car } from '@models';
import {
  AlertService,
  AnalyticsService,
  BrandService,
  CarService,
  ImageService,
  ToastIonicService,
  UserService,
} from '@services';
import { BrandGetAllDto } from '@services/api/brand/brand.dto';

@Component({
  selector: 'car-add',
  templateUrl: 'car-add.component.html',
  providers: [ImageService],
})
export class CarAddComponent implements OnInit {
  @Input() car: Car = new Car();
  @Input() brandIdSelected = '';
  @Input() myGarage = false;
  @Output() carAddSuccess: EventEmitter<void> = new EventEmitter();
  brands: Brand[] = [];
  brandsBody: BrandGetAllDto = {
    page: 1,
    pageSize: 100,
    site: 'app',
    order: ['name', 'asc'],
  };
  edit = false;
  loading = true;
  pageLog: string;

  constructor(
    private brandService: BrandService,
    private userService: UserService,
    private carService: CarService,
    private alertService: AlertService,
    private imageService: ImageService,
    private toastIonicService: ToastIonicService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this.brandService.getAll(this.brandsBody).subscribe({
      next: (data) => this.onGetAllBrandsSuccess(data.items),
      error: (err) => console.error(err),
    });
  }

  onGetAllBrandsSuccess(items: Brand[]): void {
    this.brands = items;
    if (this.brandIdSelected !== '') {
      this.edit = true;
    }
    this.pageLog = this.myGarage ? 'myGarageOne' : 'auth_register';
    this.loading = false;
  }

  async createOrUpdateItem(): Promise<void> {
    if (this.createOrUpdateSetsAndValidations()) {
      if (this.edit) {
        this.car.driver = this.car.driver._id;
        this.createOrUpdate();
      } else {
        this.car.driver = this.userService.getUser()._id;
        if (this.car.driver) {
          this.createOrUpdate();
        } else {
          this.toastIonicService.error('No se pudo obtener el usuario');
        }
      }
    }
  }

  createOrUpdateSetsAndValidations(): boolean {
    this.setData();
    const validations = this.validations();
    if (validations.state) {
      return true;
    } else {
      this.toastIonicService.error(validations.message);
      return false;
    }
  }

  setData(): void {
    this.car.brand = this.brandIdSelected;
    this.car.cc = this.car.cc ? Number(this.car.cc) : null;
    this.car.cv = this.car.cv ? Number(this.car.cv) : null;
    this.car.year = this.car.year ? Number(this.car.year) : null;
  }

  validations(): { state: boolean; message: string } {
    const data = { state: true, message: '' };
    this.validationBrand(data);
    this.validationModel(data);
    this.validationTraction(data);
    this.validationFuel(data);
    this.validationYear(data);
    this.validationCC(data);
    this.validationCV(data);
    return data;
  }

  private validationBrand(data: { state: boolean; message: string }) {
    if (!this.car.brand) {
      data.state = false;
      data.message = 'La marca es obligatoria';
      return data;
    }
  }

  private validationModel(data: { state: boolean; message: string }) {
    if (!this.car.model) {
      data.state = false;
      data.message = 'El modelo es obligatorio';
      return data;
    }
  }

  private validationTraction(data: { state: boolean; message: string }) {
    if (!this.car.traction) {
      data.state = false;
      data.message = 'La traccion es obligatoria';
      return data;
    }
  }

  private validationFuel(data: { state: boolean; message: string }) {
    if (!this.car.fuel) {
      data.state = false;
      data.message = 'El combustible es obligatorio';
      return data;
    }
  }

  private validationYear(data: { state: boolean; message: string }) {
    if (this.car.year) {
      if (this.car.year < 1900 || this.car.year > new Date().getFullYear()) {
        data.state = false;
        data.message = 'El año no es válido';
        return data;
      }
    } else {
      data.state = false;
      data.message = 'El año es obligatorio';
      return data;
    }
  }

  private validationCC(data: { state: boolean; message: string }) {
    if (this.car.cc) {
      if (this.car.cc < 0 || this.car.cc > 5000) {
        data.state = false;
        data.message = 'Los CC no son válidos';
        return data;
      }
    } else {
      data.state = false;
      data.message = 'Los CC son obligatorios';
      return data;
    }
  }

  private validationCV(data: { state: boolean; message: string }) {
    if (this.car.cv) {
      if (this.car.cv < 0 || this.car.cv > 1000) {
        data.state = false;
        data.message = 'Los CV no son válidos';
        return data;
      }
    } else {
      data.state = false;
      data.message = 'Los CV son obligatorios';
      return data;
    }
  }

  createOrUpdate(): void {
    const observable = this.edit
      ? this.carService.update(this.car)
      : this.carService.create(this.car);
    observable.subscribe({
      next: (newCar) => {
        this.car = newCar;
        if (this.edit) {
          this.analyticsService.logEvent(
            `${this.pageLog}_${this.edit ? 'edit' : 'create'}_OK`,
            {
              car: this.car._id,
            }
          );
        }
        this.edit = true;
        if (this.car.images.length === 0) {
          this.carNoImage();
        } else {
          this.toastIonicService.info(
            'El coche se ha actualizado correctamente'
          );
          this.carAddSuccess.emit();
        }
      },
      error: () => {
        this.toastIonicService.error(
          'Ha ocurrido un error, intentalo mas tarde'
        );
        this.analyticsService.logEvent(
          `${this.pageLog}_${this.edit ? 'edit' : 'create'}_KO`,
          {
            car: this.car._id,
          }
        );
      },
    });
  }

  async carNoImage() {
    const alert = await this.alertService.presentAlertWithButtons(
      '¡Listo!',
      `El coche se ha ${
        this.edit ? 'actualizado' : 'creado'
      }, pero aun no tiene ninguna foto, ¿quieres añadir una?`,
      [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          role: 'ok',
        },
      ]
    );

    const data = await alert.onDidDismiss();
    if (data.role === 'ok') {
      this.addImage();
    } else {
      this.carAddSuccess.emit();
    }
  }

  async addImage(): Promise<void> {
    this.imageService.addNewToGallery('car', this.car._id).then(
      () => this.carAddSuccess.emit(),
      () =>
        this.toastIonicService.error(
          'Ha ocurrido un error, intentalo mas tarde'
        )
    );
  }
}
