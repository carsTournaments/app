import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { config } from '@config';
import { NavController } from '@ionic/angular';
import { Car } from '@models';
import { CarService } from '@services';
import { MyGarageOneViewModel } from '../../models/my-garage-one.view-model';

@Component({
  selector: 'page-my-garage-one',
  templateUrl: 'my-garage-one.page.html',
  styleUrls: ['./my-garage-one.page.scss'],
})
export class MyGarageOnePage implements OnInit {
  vm = new MyGarageOneViewModel();
  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.vm.id = this.route.snapshot.paramMap.get('id')!;
    if (this.vm.id) {
      this.getOne();
      this.vm.edit = true;
    } else {
      this.vm.edit = false;
      this.vm.loading = false;
    }
  }

  getOne() {
    this.vm.loading = true;
    this.carService.getOne(this.vm.id).subscribe({
      next: (data) => this.onGetOneSuccess(data),
      error: () => {
        this.vm.loading = false;
        this.vm.error = false;
      },
    });
  }

  onGetOneSuccess(data: Car) {
    this.vm.car = data;
    this.vm.brandIdSelected = this.vm.car.brand._id;
    this.vm.loading = false;
    this.vm.error = false;
  }

  carAddSuccess() {
    this.navCtrl.navigateBack([config.routes.myGarage]);
  }
}
