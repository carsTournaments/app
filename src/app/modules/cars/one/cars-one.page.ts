import { CarService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { CarsOneViewModel } from '..';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'cars-one',
    templateUrl: 'cars-one.page.html',
    styleUrls: ['./cars-one.page.scss'],
})

export class CarsOnePage implements OnInit {
    vm = new CarsOneViewModel();
    constructor(private carService: CarService, private navCtrl: NavController, private route: ActivatedRoute) { }

    ngOnInit() {
        this.vm.id = this.route.snapshot.paramMap.get('id') as string;
        this.getOne();
    }

    getOne() {
        this.carService.getOne(this.vm.id).subscribe({
            next: (data) => {
                this.vm.car = data;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    segmentChanged(event: { detail: { value: any } }) {
        this.vm.header.segments.selected = Number(event.detail.value);
    }
}
