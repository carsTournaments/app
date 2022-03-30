import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(public router: Router) {}

    async canActivate() {
        if (localStorage.getItem('token')) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
