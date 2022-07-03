import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'auth',
    templateUrl: 'auth.component.html',
})
export class AuthComponent {
    @Output() clickLogin: EventEmitter<void> = new EventEmitter<void>();
    status = {
        normal: true,
        login: false,
        register: false,
        afterRegister: false,
    };

    goToMode(type: 'normal' | 'login' | 'register' | 'afterRegister') {
        for (const key in this.status) {
            if (key === type) {
                this.status[key] = true;
            } else {
                this.status[key] = false;
            }
        }
    }

    checkGoogleLoginOrRegister(register: boolean) {
        if (register) {
            this.registerSuccess(false);
        } else {
            this.loginSuccess();
        }
    }

    loginSuccess() {
        this.clickLogin.emit();
    }

  registerSuccess(emailMode = true) {
    if (emailMode) {
      this.clickLogin.emit();
    } else {
      this.goToMode('afterRegister');
    }
  }
}
