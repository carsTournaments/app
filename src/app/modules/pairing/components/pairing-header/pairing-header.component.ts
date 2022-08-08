import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image, Pairing } from '@models';

@Component({
  selector: 'pairing-header',
  templateUrl: 'pairing-header.component.html',
  styleUrls: ['./pairing-header.component.scss'],
})
export class PairingHeaderComponent {
  @Input() pairing: Pairing;
  @Input() images: { car1: Image; car2: Image };
  @Input() backButtonRoute: string;
  @Input() voted: boolean;
  @Output() share = new EventEmitter<void>();
  @Output() vote = new EventEmitter<string>();
  @Output() openImage = new EventEmitter<string>();
}
