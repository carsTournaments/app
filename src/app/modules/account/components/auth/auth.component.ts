import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'auth',
    templateUrl: 'auth.component.html',
})
export class AuthComponent {
    @Output() loggedSuccess: EventEmitter<void> = new EventEmitter<void>();
    status = {
        normal: true,
        login: false,
        register: false,
        afterRegisterUser: false,
        afterRegisterCar: false,
    };

    goToMode(
        type:
            | 'normal'
            | 'login'
            | 'register'
            | 'afterRegisterUser'
            | 'afterRegisterCar'
    ) {
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
        this.loggedSuccess.emit();
    }

    registerSuccess(emailMode = true) {
        if (emailMode) {
            this.loggedSuccess.emit();
        } else {
            this.goToMode('afterRegisterUser');
        }
    }
}
