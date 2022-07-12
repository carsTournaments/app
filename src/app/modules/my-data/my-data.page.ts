import { Component, OnInit } from '@angular/core';
import { config } from '@config';
import { NavController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastIonicService, UserService } from '@services';
import { tap } from 'rxjs/operators';
import { countries } from '../../../assets/json/countries';
import { MyDataViewModel } from './model/my-data.view-model';

@Component({
    selector: 'page-my-data',
    templateUrl: 'my-data.page.html',
    styleUrls: ['./my-data.page.scss'],
    providers: [TranslatePipe],
})
export class MyDataPage implements OnInit {
    vm = new MyDataViewModel();

    constructor(
        private userService: UserService,
        private toastService: ToastIonicService,
        private navCtrl: NavController,
        private translatePipe: TranslatePipe
    ) {}

    ngOnInit() {
        this.getUser();
        this.getCountries();
    }

    ionViewWillEnter() {
        this.vm.header.title = this.translatePipe.transform('myData.title');
    }

    getUser() {
        this.vm.user = this.userService.getUser();
        this.vm.countryIdSelected = this.vm.user.country;
    }

    getCountries() {
        this.vm.countries = countries;
    }

    updateUser() {
        this.vm.user.country = this.vm.countryIdSelected;
        this.userService
            .update(this.vm.user)
            .pipe(tap((user) => this.userService.set(user)))
            .subscribe({
                next: () => {
                    this.navCtrl.navigateBack(config.routes.account);
                    this.toastService.info('Datos actualizados correctamente');
                },
            });
    }
}
