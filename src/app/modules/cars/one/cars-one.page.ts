import { CarService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { CarsOneViewModel } from '..';
import { ActivatedRoute } from '@angular/router';
import { ImagePipe } from 'src/app/pipes';

@Component({
    selector: 'cars-one',
    templateUrl: 'cars-one.page.html',
    styleUrls: ['./cars-one.page.scss'],
})
export class CarsOnePage implements OnInit {
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
                if (data && data.image) {
                    this.vm.image = this.imagePipe.transform(data.image.url);
                }
            },
            error: (err) => console.error(err),
        });
    }

    segmentChanged(event: { detail: { value: any } }) {
        this.vm.header.segments.selected = Number(event.detail.value);
    }
}
