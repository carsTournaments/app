import { AuthRegisterDto } from './../../services/api/auth/auth.dto';
import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models';
import { AlertService, AuthService } from 'src/app/services';
import { AuthLogInDto } from 'src/app/services/api/auth/auth.dto';
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
        private alertService: AlertService
    ) {}

    login() {
        if (this.validations('login')) {
            const data: AuthLogInDto = {
                email: this.vm.email,
                password: this.vm.password,
            };
            this.authService.login(data).subscribe({
                next: (response) => this.onLoginOrRegisterSuccess(response),
                error: (error) =>
                    this.alertService.presentAlert('Error', error),
            });
        }
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
                next: (response) => this.onLoginOrRegisterSuccess(response),
                error: (error) =>
                    this.alertService.presentAlert('Error', error),
            });
        }
    }

    validations(type: 'login' | 'register') {
        let state = true;
        if (this.vm.email.length === 0 || this.vm.password.length === 0) {
            this.alertService.presentAlert('Error', 'Revisa los datos');
            return (state = false);
        }
        if (type === 'register') {
            if (this.vm.email.length === 0 || this.vm.password.length === 0) {
                this.alertService.presentAlert('Error', 'Revisa los datos');
                return (state = false);
            }

            if (this.vm.name.length < 3) {
                this.alertService.presentAlert('Error', 'Revisa los datos');
                return (state = false);
            }

            if (this.vm.password !== this.vm.password2) {
                this.alertService.presentAlert(
                    'Error',
                    'Las contraseñas no coinciden'
                );
                return (state = false);
            }
        }
        return state;
    }

    onLoginOrRegisterSuccess(response: { item: User; token: string }) {
        this.authService.setToken(response.token);
        this.authService.setUser(response.item);
        this.clickLogin.emit();
    }
}
