import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';
import { Image } from '@models';

@Pipe({
  name: 'imageCar',
})
export class ImageCarPipe implements PipeTransform {
  transform(images: Image[], position = 0): string {
    if (images && images.length > 0) {
      return `${environment.urlImages}/${images[position].url}`;
    } else {
      return 'assets/no-image.png';
    }
  }
}
