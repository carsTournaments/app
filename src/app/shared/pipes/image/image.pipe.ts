import { environment } from '../../../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return `${environment.urlImages}/${value}`;
    } else {
      return 'assets/no-image.png';
    }
  }
}
