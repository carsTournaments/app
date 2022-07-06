import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService, AlertService, AnalyticsService } from '@services';

@Component({
    selector: 'auth-selection',
    templateUrl: 'auth-selection.component.html',
    styleUrls: ['./auth-selection.component.scss'],
})
export class AuthSelectionComponent {
    @Output() loginGoogleSuccess: EventEmitter<boolean> =
        new EventEmitter<boolean>();
    @Output() goToLogin: EventEmitter<void> = new EventEmitter();
    constructor(
        private authService: AuthService,
        private alertService: AlertService,
        private analyticsService: AnalyticsService
    ) {}

    async loginGoogle() {
        const data = await this.authService.loginGoogle();
        data.subscribe({
            next: (newUser) => {
                if (newUser) {
                    this.analyticsService.logEvent(
                        'auth_loginGoogle_register_OK'
                    );
                    // TODO: enviar a nueva pagina de steps
                } else {
                    this.analyticsService.logEvent('auth_loginGoogle_login_OK');
                }
                this.loginGoogleSuccess.emit(newUser);
            },
            error: (error) => {
                this.analyticsService.logEvent('auth_loginGoogle_KO');
                this.alertService.presentAlert('Error', error);
            },
        });
    }
}
