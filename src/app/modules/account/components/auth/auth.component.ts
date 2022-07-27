import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'auth',
  templateUrl: 'auth.component.html',
})
export class AuthComponent {
  @Output() loggedSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() changeTitle: EventEmitter<string> = new EventEmitter<string>();
  items = [
    {
      name: 'normal',
      status: true,
      title: 'Tu cuenta',
    },
    {
      name: 'login',
      status: false,
      title: 'Inicia sesión',
    },
    {
      name: 'register',
      status: false,
      title: 'Regístrate',
    },
    {
      name: 'afterRegisterUser',
      status: false,
      title: 'Tus datos',
    },
    {
      name: 'afterRegisterCar',
      status: false,
      title: 'Tu coche',
    },
  ];

  goToMode(
    type:
      | 'normal'
      | 'login'
      | 'register'
      | 'afterRegisterUser'
      | 'afterRegisterCar'
  ) {
    const item = this.items.find((item) => item.name === type);
    if (item) {
      item.status = true;
      this.items.forEach((item) => {
        if (item.name !== type) {
          item.status = false;
        }
      });
      this.changeTitle.emit(item.title);
    }
  }

  checkStatusItem(
    type:
      | 'normal'
      | 'login'
      | 'register'
      | 'afterRegisterUser'
      | 'afterRegisterCar'
  ) {
    const item = this.items.find((item) => item.name === type);
    if (item) {
      return item.status;
    } else {
      return false;
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
