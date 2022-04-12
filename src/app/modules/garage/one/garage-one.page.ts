import { AuthService } from './../../../services/api/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService, BrandService, AlertService } from 'src/app/services';
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
        private navCtrl: NavController
    ) {}

    ngOnInit() {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.getAllBrands();
        if (this.vm.id) {
            this.getOne();
            this.vm.edit = true;
        } else {
            this.vm.edit = false;
        }
    }

    getOne() {
        this.carService.getOne(this.vm.id).subscribe({
            next: (data) => {
                this.vm.car = data;
                this.vm.brandIdSelected = this.vm.car.brand._id;
            },
            error: (err) => console.error(err),
        });
    }

    getAllBrands() {
        this.brandService.getAll(this.vm.brandsBody).subscribe({
            next: (data) => (this.vm.brands = data.items),
            error: (err) => console.error(err),
        });
    }

    async createOrUpdateItem() {
        this.vm.car.brand = this.vm.brandIdSelected;
        this.vm.car.cc = this.vm.car.cc ? Number(this.vm.car.cc) : null;
        this.vm.car.cv = this.vm.car.cv ? Number(this.vm.car.cv) : null;
        this.vm.car.year = this.vm.car.year ? Number(this.vm.car.year) : null;
        const validations = this.validations();
        if (validations.state) {
            if (this.vm.edit) {
                this.vm.car.driver = this.vm.car.driver._id;
                this.update();
            } else {
                this.vm.car.driver = (await this.authService.getUser())._id;
                if (this.vm.car.driver) {
                    this.create();
                } else {
                    this.alertService.presentAlert(
                        'Vaya',
                        'No se pudo obtener el usuario'
                    );
                }
            }
        } else {
            this.alertService.presentAlert('¡Vaya!', validations.message);
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

    update() {
        this.carService.update(this.vm.car).subscribe({
            next: () => {
                this.navCtrl.navigateBack('/garage');
                this.alertService.presentAlert(
                    '¡Vale!',
                    'El coche se actualizo correctamente'
                );
            },
            error: (err) => console.error(err),
        });
    }

    create() {
        this.carService.create(this.vm.car).subscribe({
            next: () => {
                this.navCtrl.navigateBack('/garage');
                this.alertService.presentAlert(
                    '¡Vale!',
                    'El coche se creo correctamente'
                );
            },
            error: (err) => console.error(err),
        });
    }
}