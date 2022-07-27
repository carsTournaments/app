import { Component, EventEmitter, Output } from '@angular/core';
import { AuthRegisterDto } from '@core/auth/auth.dto';
import { Register } from '@models';
import { AnalyticsService, AuthService, ToastIonicService } from '@services';

@Component({
  selector: 'auth-register',
  templateUrl: 'auth-register.component.html',
  styleUrls: ['./auth-register.component.scss'],
})
export class AuthRegisterComponent {
  @Output() registerSuccess: EventEmitter<void> = new EventEmitter();
  @Output() goToLogin: EventEmitter<void> = new EventEmitter();
  data = new Register();
  constructor(
    private authService: AuthService,
    private analyticsService: AnalyticsService,
    private toastIonicService: ToastIonicService
  ) {}

  register() {
    if (this.validations()) {
      const data: AuthRegisterDto = {
        name: this.data.name,
        email: this.data.email,
        password: this.data.password,
      };
      this.authService.register(data).subscribe({
        next: () => {
          this.analyticsService.logEvent('auth_register_OK');
          this.registerSuccess.emit();
        },
        error: () => {
          this.analyticsService.logEvent('auth_register_KO');
          this.toastIonicService.error(
            'Error al registrar usuario, intenta de nuevo mas tarde'
          );
        },
      });
    }
  }

  validations() {
    let state = true;
    if (this.data.name.length <= 3) {
      this.analyticsService.logEvent('auth_validations_register_name_KO');
      this.toastIonicService.error('Revisa los datos');
      state = false;
      return state;
    }

    if (this.data.password !== this.data.password2) {
      this.analyticsService.logEvent('auth_validations_register_password_KO');
      this.toastIonicService.error('Las contraseñas no coinciden');
      state = false;
      return state;
    }
  }
}
