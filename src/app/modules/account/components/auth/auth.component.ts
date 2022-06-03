import { Component, EventEmitter, Output } from '@angular/core';
import { AlertService, AnalyticsService, AuthService } from '@services';
import { AuthLogInDto, AuthRegisterDto } from '@core/auth/auth.dto';
import { AuthViewModel } from './auth.view-model';

@Component({
    selector: 'auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    @Output() clickLogin: EventEmitter<void> = new EventEmitter<void>();
    vm = new AuthViewModel();
    constructor(
        private authService: AuthService,
        private alertService: AlertService,
        private analyticsService: AnalyticsService
    ) {}

    login() {
        if (this.validations('login')) {
            const data: AuthLogInDto = {
                email: this.vm.email,
                password: this.vm.password,
            };
            this.authService.login(data).subscribe({
                next: (response) => {
                    if (response) {
                        this.analyticsService.logEvent('auth_login_OK');
                        this.clickLogin.emit();
                    }
                },
                error: (error) => {
                    this.analyticsService.logEvent('auth_login_KO');
                    this.alertService.presentAlert('Error', error);
                },
            });
        }
    }

    async loginGoogle() {
        const data = await this.authService.loginGoogle();
        data.subscribe({
            next: (response) => {
                if (response) {
                    this.analyticsService.logEvent('auth_loginGoogle_OK');
                    this.clickLogin.emit();
                }
            },
            error: (error) => {
                this.analyticsService.logEvent('auth_loginGoogle_KO');
                this.alertService.presentAlert('Error', error);
            },
        });
    }

    register() {
        if (this.validations('register')) {
            this.vm.loginMode = false;
            const data: AuthRegisterDto = {
                name: this.vm.name,
                email: this.vm.email,
                password: this.vm.password,
            };
            this.authService.register(data).subscribe({
                next: (response) => {
                    if (response) {
                        this.analyticsService.logEvent('auth_register_OK');
                        this.clickLogin.emit();
                    }
                },
                error: (error) => {
                    this.analyticsService.logEvent('auth_register_KO');
                    this.alertService.presentAlert('Error', error);
                },
            });
        }
    }

    validations(type: 'login' | 'register') {
        let state = true;
        if (this.vm.email.length === 0 || this.vm.password.length === 0) {
            this.analyticsService.logEvent('auth_validations_generic_KO');
            this.alertService.presentAlert('Error', 'Revisa los datos');
            return (state = false);
        }
        if (type === 'register') {
            if (this.vm.name.length <= 3) {
                this.analyticsService.logEvent(
                    'auth_validations_register_name_KO'
                );
                this.alertService.presentAlert('Error', 'Revisa los datos');
                return (state = false);
            }

            if (this.vm.password !== this.vm.password2) {
                this.analyticsService.logEvent(
                    'auth_validations_register_password_KO'
                );
                this.alertService.presentAlert(
                    'Error',
                    'Las contraseñas no coinciden'
                );
                return (state = false);
            }
        }
        return state;
    }
}
