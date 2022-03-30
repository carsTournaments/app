import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/api/auth/auth.service';
import { AccountViewModel } from './model/account.view-model';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['./account.page.scss']
})
export class AccountPage {
  vm = new AccountViewModel();

  constructor(private authService: AuthService) { }
  
  
  
  register() {}

}
