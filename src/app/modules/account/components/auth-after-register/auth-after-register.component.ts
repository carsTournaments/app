import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '@models';
import { AlertService, ToastIonicService, UserService } from '@services';
import { countries } from '../../../../../assets/json/countries';

@Component({
    selector: 'auth-after-register',
    templateUrl: 'auth-after-register.component.html',
    styleUrls: ['./auth-after-register.component.scss'],
})
export class AuthAfterRegisterComponent implements OnInit {
    @Output() afterRegisterSuccess: EventEmitter<void> = new EventEmitter();
    @Output() goToAfterCar: EventEmitter<void> = new EventEmitter();
    user = new User();
    countryIdSelected = 'es';
    countries: { id: string; name: string }[] = [];
    type = 'type1';
    constructor(
        private userService: UserService,
        private toastIonicService: ToastIonicService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.getCountries();
        const user = this.userService.getUser();
        if (user) {
            this.user = user;
        }
    }

    getCountries() {
        this.countries = countries;
    }

    updateUser() {
        this.user.country = this.countryIdSelected;
        this.userService.update(this.user).subscribe({
            next: async () => {
                if (this.type === 'type1') {
                    this.afterRegisterSuccess.emit();
                } else {
                    await this.onDriverSelected();
                }
            },
            error: () => {
                this.toastIonicService.error(
                    'No se han podido actualizar tus datos'
                );
                this.afterRegisterSuccess.emit();
            },
        });
    }

    async onDriverSelected() {
        const alert = await this.alertService.presentAlertWithButtons(
            '¡Oye!',
            'Has elegido conductor, ¿Te gustaria añadir tu coche ahora?',
            [
                { text: 'No', role: 'cancel' },
                { text: 'Si', role: 'ok' },
            ]
        );
        const data = await alert.onDidDismiss();
        if (data.role === 'ok') {
            // TODO: Despues de actualizar, mostrar ventana de quieres coche o no
            this.goToAfterCar.emit();
        } else {
            this.afterRegisterSuccess.emit();
        }
    }
}
