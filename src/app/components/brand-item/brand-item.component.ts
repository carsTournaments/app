import { Brand } from './../../models/brand.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'brand-item',
    templateUrl: 'brand-item.component.html',
    styleUrls: ['./brand-item.component.scss']
})

export class BrandItemComponent implements OnInit {
    @Input() brand: Brand;
    @Output() onClick: EventEmitter<Brand> = new EventEmitter<Brand>();
    constructor() { }

    ngOnInit() { }
}