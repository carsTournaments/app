import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Brand } from 'src/app/models';

@Component({
    selector: 'brand-item',
    templateUrl: 'brand-item.component.html',
    styleUrls: ['./brand-item.component.scss'],
})
export class BrandItemComponent implements OnInit {
    @Input() brand: Brand;
    @Output() clickItem: EventEmitter<Brand> = new EventEmitter<Brand>();
    constructor() {}

    ngOnInit() {}
}
