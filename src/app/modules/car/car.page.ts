import { CarService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { CarsOneViewModel } from '../cars';
import { ActivatedRoute } from '@angular/router';
import { ImagePipe } from 'src/app/pipes';

@Component({
    selector: 'page-car',
    templateUrl: 'car.page.html',
    styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
    vm = new CarsOneViewModel();
    constructor(
        private carService: CarService,
        private route: ActivatedRoute,
        private imagePipe: ImagePipe
    ) {}

    ngOnInit() {
        this.vm.id = this.route.snapshot.paramMap.get('id');
        this.getOne();
    }

    getOne() {
        this.carService.getOne(this.vm.id).subscribe({
            next: (data) => {
                this.vm.car = data;
                this.vm.header.title = `${data.brand.name} ${data.model}`;
                if (data && data.image) {
                    this.vm.image = this.imagePipe.transform(data.image.url);
                }
            },
            error: (err) => console.error(err),
        });
    }
}
