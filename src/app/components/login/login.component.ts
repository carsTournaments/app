import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { AlertService } from 'src/app/services/ionic/alert.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    @Output() clickLogin: EventEmitter<void> = new EventEmitter<void>();
    email = '';
    password = '';
    constructor(
        private authService: AuthService,
        private alertService: AlertService
    ) {}

    login() {
        console.log(this.email, this.password);
        if (this.email.length === 0 || this.password.length === 0) {
            alert('Revisa los datos');
            this.alertService.presentAlert('Error', 'Revisa los datos');
        } else {
            this.authService.login(this.email, this.password).subscribe({
                next: (response) => this.onLoginSuccess(response),
                error: (error) =>
                    this.alertService.presentAlert('Error', error),
            });
        }
    }

    onLoginSuccess(response: { item: User; token: string }) {
        this.clickLogin.emit();
        this.authService.setToken(response.token);
        this.authService.setUser(response.item);
    }

    register() {}

    isDisabled = () => this.email.length === 0 || this.password.length === 0;
}
