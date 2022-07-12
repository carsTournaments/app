import { Component, EventEmitter, Output } from '@angular/core';
import { AuthLogInDto } from '@core/auth/auth.dto';
import { Login } from '@models';
import { AlertService, AnalyticsService, AuthService } from '@services';

@Component({
    selector: 'auth-login',
    templateUrl: 'auth-login.component.html',
    styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent {
    @Output() goToRegister: EventEmitter<void> = new EventEmitter();
    @Output() goToSelect: EventEmitter<void> = new EventEmitter();
    @Output() loginSuccess: EventEmitter<void> = new EventEmitter();
    data = new Login();
    constructor(
        private alertService: AlertService,
        private authService: AuthService,
        private analyticsService: AnalyticsService
    ) {}

    login() {
        if (this.validations()) {
            const data: AuthLogInDto = {
                email: this.data.email,
                password: this.data.password,
            };
            this.authService.login(data).subscribe({
                next: (response) => {
                    if (response) {
                        this.analyticsService.logEvent('auth_login_OK');
                        this.loginSuccess.emit();
                    }
                },
                error: (error) => {
                    this.analyticsService.logEvent('auth_login_KO');
                    this.alertService.presentAlert('Error', error);
                },
            });
        }
    }

    private validations() {
        let state = true;
        if (this.data.email.length === 0 || this.data.password.length === 0) {
            this.analyticsService.logEvent('auth_validations_generic_KO');
            this.alertService.presentAlert('Error', 'Revisa los datos');
            state = false;
            return state;
        }
        return state;
    }
}
