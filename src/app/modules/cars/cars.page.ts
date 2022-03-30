import { Brand } from './../../models/brand.model';
import { Component } from '@angular/core';
import { CarsViewModel } from './model/cars.view-model';
import { BrandService } from 'src/app/services/api/brand/brand.service';
import { CarService } from 'src/app/services/api/car/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: 'cars.page.html',
  styleUrls: ['cars.page.scss']
})
export class CarsPage {
  vm = new CarsViewModel();

  constructor(private carService: CarService, private brandService: BrandService) { }

  ngOnInit() {
    this.getCars();
    this.getBrands();
  }

  getCars(event?: any) {
    this.carService.getAll(this.vm.carsBody).subscribe({
      next: (res) => {
        if (event) {
          if (res.items.length > 0) {
            this.vm.cars = this.vm.cars.concat(res.items);
            event.target.complete();
          } else {
            event.target.disabled = true;
          }
        } else {
          this.vm.cars = res.items;
        }
      },
      error: (err) => console.log(err)
    })
  }

  getBrands(event?: any) {
    this.brandService.getAllBrandsAndCars(this.vm.brandsBody).subscribe({
      next: (res) => {
        if (event) {
          if (res.items.length > 0) {
            this.vm.brands = this.vm.brands.concat(res.items);
            event.target.complete();
          } else {
            event.target.disabled = true;
          }
        } else {
          this.vm.brands = res.items;
        }
      },
      error: (err) => console.log(err)
    })

  }

  loadMoreData(event: any, type: string) {
    if (type === 'cars') {
      this.vm.carsBody.page++;
      this.getCars(event);
    } else {
      this.vm.brandsBody.page++;
      this.getBrands(event);
    }
  }

  segmentChanged(ev: any) {
    this.vm.segments.selected = Number(ev.detail.value);
  }

  onClickBrand(brand: Brand) {
    console.log(brand);
    this.vm.carsBody.brand = brand._id;
    this.vm.carsBody.page = 1;
    this.vm.filter = true;
    this.vm.segments.selected = 0;
    this.getCars();
  }

  cleanFilter() {
    this.vm.carsBody.brand = null;
    this.vm.filter = false;
    this.vm.segments.selected = 0;
    this.getCars();
  }
}
