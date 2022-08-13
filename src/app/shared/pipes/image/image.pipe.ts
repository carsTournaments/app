import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

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
