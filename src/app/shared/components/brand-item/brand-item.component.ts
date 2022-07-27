import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brand } from '@models';

@Component({
  selector: 'brand-item',
  templateUrl: 'brand-item.component.html',
  styleUrls: ['./brand-item.component.scss'],
})
export class BrandItemComponent {
  @Input() brand: Brand;
  @Output() clickItem: EventEmitter<Brand> = new EventEmitter<Brand>();
}
