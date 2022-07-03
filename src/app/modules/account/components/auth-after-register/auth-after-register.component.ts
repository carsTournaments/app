import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '@models';
import { UserService } from '@services';
import { countries } from '../../../../../assets/json/countries';

@Component({
    selector: 'auth-after-register',
    templateUrl: 'auth-after-register.component.html',
    styleUrls: ['./auth-after-register.component.scss'],
})
export class AuthAfterRegisterComponent implements OnInit {
  @Output() afterRegisterSuccess: EventEmitter<void> = new EventEmitter();
  user = new User();
  countryIdSelected = 'es';
  countries: { id: string; name: string }[] = [];
  type = 'type1';
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getCountries();
    const user = this.userService.getUser();
    if (user) {
      this.user = user;
    }
  }

  getCountries() {
    this.countries = countries;
  }

  updateUser() {
    this.user.country = this.countryIdSelected;
    this.userService.update(this.user).subscribe({
      next: () => {
        if (this.type === 'type1') {
          this.afterRegisterSuccess.emit();
        } else {
          this.afterRegisterSuccess.emit();
          // TODO: Despues de actualizar, mostrar ventana de quieres coche o no
        }
      },
    });
  }
}
