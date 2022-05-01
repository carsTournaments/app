import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    CarService,
    BrandService,
    AlertService,
    AuthService,
    ImageService,
    UtilsService,
} from 'src/app/services';
import { GarageOneViewModel } from './model/garage-one.view-model';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'page-garage-one',
    templateUrl: 'garage-one.page.html',
})
export class GarageOnePage implements OnInit {
    vm = new GarageOneViewModel();
    constructor(
        private carService: CarService,
        private brandService: BrandService,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private authService: AuthService,
        private navCtrl: NavController,
        private imageService: ImageService,
        private utilsService: UtilsService
    ) {}

    ngOnInit() {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.getAllBrands();
        if (this.vm.id) {
            this.getOne();
            this.vm.edit = true;
        } else {
            this.vm.edit = false;
            this.vm.loading = false;
        }
    }

    getOne() {
        this.vm.loading = true;
        this.carService.getOne(this.vm.id).subscribe({
            next: (data) => {
                this.vm.car = data;
                this.vm.brandIdSelected = this.vm.car.brand._id;
                this.vm.loading = false;
                this.vm.error = false;
            },
            error: () => {
                this.vm.loading = false;
                this.vm.error = false;
            },
        });
    }

    getAllBrands() {
        this.brandService.getAll(this.vm.brandsBody).subscribe({
            next: (data) => (this.vm.brands = data.items),
            error: (err) => console.error(err),
        });
    }

    async createOrUpdateItem() {
        if (this.createOrUpdateSetsAndValidations()) {
            if (this.vm.edit) {
                this.vm.car.driver = this.vm.car.driver._id;
                this.createOrUpdate();
            } else {
                this.vm.car.driver = (await this.authService.getUser())._id;
                if (this.vm.car.driver) {
                    this.createOrUpdate();
                } else {
                    this.alertService.presentAlert(
                        'Vaya',
                        'No se pudo obtener el usuario'
                    );
                }
            }
        }
    }

    createOrUpdateSetsAndValidations() {
        this.vm.car.brand = this.vm.brandIdSelected;
        this.vm.car.cc = this.vm.car.cc ? Number(this.vm.car.cc) : null;
        this.vm.car.cv = this.vm.car.cv ? Number(this.vm.car.cv) : null;
        this.vm.car.year = this.vm.car.year ? Number(this.vm.car.year) : null;
        const validations = this.validations();
        if (validations.state) {
            return true;
        } else {
            this.alertService.presentAlert('¡Vaya!', validations.message);
            return false;
        }
    }

    validations(): { state: boolean; message: string } {
        const data = {
            state: true,
            message: '',
        };

        if (!this.vm.car.brand) {
            data.state = false;
            data.message = 'La marca es obligatoria';
            return data;
        }

        if (!this.vm.car.model) {
            data.state = false;
            data.message = 'El modelo es obligatorio';
            return data;
        }

        if (!this.vm.car.traction) {
            data.state = false;
            data.message = 'La traccion es obligatoria';
            return data;
        }

        if (!this.vm.car.fuel) {
            data.state = false;
            data.message = 'El combustible es obligatorio';
            return data;
        }

        if (this.vm.car.year) {
            if (
                this.vm.car.year < 1900 ||
                this.vm.car.year > new Date().getFullYear()
            ) {
                data.state = false;
                data.message = 'El año no es válido';
                return data;
            }
        } else {
            data.state = false;
            data.message = 'El año es obligatorio';
            return data;
        }

        if (this.vm.car.cv) {
            if (this.vm.car.cv < 0 || this.vm.car.cv > 1000) {
                data.state = false;
                data.message = 'Los CV no son válidos';
                return data;
            }
        } else {
            data.state = false;
            data.message = 'Los CV son obligatorios';
            return data;
        }

        if (this.vm.car.cc) {
            if (this.vm.car.cc < 0 || this.vm.car.cc > 5000) {
                data.state = false;
                data.message = 'Los CC no son válidos';
                return data;
            }
        } else {
            data.state = false;
            data.message = 'Los CC son obligatorios';
            return data;
        }
        return data;
    }

    createOrUpdate() {
        const observable = this.vm.edit
            ? this.carService.update(this.vm.car)
            : this.carService.create(this.vm.car);
        observable.subscribe({
            next: () => {
                this.navCtrl.navigateBack('/garage');
                if (!this.vm.car.image) {
                    this.alertService.presentAlertWithButtons(
                        '¡Listo!',
                        `El coche se ha ${
                            this.vm.edit ? 'actualizado' : 'creado'
                        }, pero aun no tiene ninguna foto, ¿quieres añadir una?`,
                        [
                            {
                                text: 'No',
                                role: 'cancel',
                            },
                            {
                                text: 'Sí',
                                handler: () => this.addImage(),
                            },
                        ]
                    );
                } else {
                    this.alertService.presentAlert(
                        '¡Listo!',
                        'El coche se ha actualizado correctamente'
                    );
                }
            },
            error: () =>
                this.alertService.presentAlert(
                    '¡Vaya!',
                    'No se pudo actualizar el coche'
                ),
        });
    }

    async addImage(): Promise<void> {
        this.vm.loading = true;
        this.imageService.addNewToGallery('car', this.vm.car._id).then(
            () => {
                this.vm.loading = false;
                this.utilsService.reloadPage();
            },
            (error) => {
                this.vm.loading = false;
                this.alertService.presentAlert('Error', error);
            }
        );
    }
}
