import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastIonicService, UserService } from '@services';
import { countries } from '../../../assets/json/countries';
import { MyDataViewModel } from './model/my-data.view-model';

@Component({
    selector: 'page-my-data',
    templateUrl: 'my-data.page.html',
    styleUrls: ['./my-data.page.scss'],
})
export class MyDataPage implements OnInit {
    vm = new MyDataViewModel();

    constructor(
        private userService: UserService,
        private toastService: ToastIonicService,
        private navCtrl: NavController
    ) {}

    ngOnInit() {
        this.getUser();
        this.getCountries();
    }

    getUser() {
        this.vm.user = this.userService.getUser();
    }

    getCountries() {
        this.vm.countries = countries;
    }

    updateUser() {
        this.vm.user.country = this.vm.countryIdSelected;
        this.userService.update(this.vm.user).subscribe({
            next: () => {
                this.navCtrl.navigateBack('/tab/account');
                this.toastService.info('Datos actualizados correctamente');
            },
        });
    }
}
