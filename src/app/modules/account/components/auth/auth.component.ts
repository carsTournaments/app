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
    };

    goToMode(type: 'normal' | 'login' | 'register') {
        if (type === 'normal') {
            this.status.normal = true;
            this.status.login = false;
            this.status.register = false;
        } else if (type === 'login') {
            this.status.normal = false;
            this.status.login = true;
            this.status.register = false;
        } else if (type === 'register') {
            this.status.normal = false;
            this.status.login = false;
            this.status.register = true;
        }
    }

    checkGoogleLoginOrRegister(register: boolean) {
        if (register) {
        } else {
            this.clickLogin.emit();
        }
    }

    loginSuccess() {
        this.clickLogin.emit();
    }

    registerSuccess() {
        // TODO: Llevar a modo register
    }
}
