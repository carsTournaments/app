import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services';
import { GarageOneViewModel } from './model/garage-one.view-model';

@Component({
    selector: 'page-garage-one',
    templateUrl: 'garage-one.page.html',
})
export class GarageOnePage implements OnInit {
    vm = new GarageOneViewModel();
    constructor(
        private carService: CarService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.getOne();
    }

    getOne() {
        this.carService.getOne(this.vm.id).subscribe({
            next: (data) => (this.vm.car = data),
            error: (err) => console.error(err),
        });
    }
}
