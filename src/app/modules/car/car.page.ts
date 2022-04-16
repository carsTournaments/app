import { CarService, ImageService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagePipe } from 'src/app/pipes';
import { CarViewModel } from './model/car.view-model';

@Component({
    selector: 'page-car',
    templateUrl: 'car.page.html',
    styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
    vm = new CarViewModel();
    constructor(
        private carService: CarService,
        private route: ActivatedRoute,
        private imagePipe: ImagePipe,
        private imageService: ImageService
    ) {}

    ngOnInit() {
        this.vm.id = this.route.snapshot.paramMap.get('id');
        this.getOne();
    }

    getOne() {
        this.vm.loading = true;
        this.carService.getOne(this.vm.id).subscribe({
            next: (data) => {
                this.vm.car = data;
                this.vm.header.title = `${data.brand?.name} ${data.model}`;
                if (data && data.image) {
                    this.vm.image = this.imagePipe.transform(data.image.url);
                }
                this.vm.loading = false;
            },
            error: () => {
                this.vm.loading = false;
                this.vm.error = true;
            },
        });
    }

    openImage(image: string) {
        this.imageService.openImage(image);
    }
}
