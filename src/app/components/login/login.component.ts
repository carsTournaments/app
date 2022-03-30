import { User } from './../../models/user.model';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth/auth.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    email = '';
    password = '';
    constructor(private authService: AuthService) { }

    login() {
        console.log(this.email, this.password);
        if (this.email.length === 0 || this.password.length === 0) {
            alert('Revisa los datos')
        } else {
            this.authService.login(this.email, this.password).subscribe({
                next: (response) => this.onLoginSuccess(response),
                error: (error) => alert(error)
            });
        }
    }

    onLoginSuccess(response: { item: User, token: string }) {

    }

    register() { }

    isDisabled = () => {
        return this.email.length === 0 || this.password.length === 0;
    }
}