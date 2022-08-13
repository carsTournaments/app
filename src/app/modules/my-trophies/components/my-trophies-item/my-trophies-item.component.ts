import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tournament } from '@models';
import { WinnerGetAllUserWinnersI } from '@services/api/winner/winner.responses';
import { ImageCarPipe } from '@shared/pipes';

@Component({
  selector: 'my-trophies-item',
  templateUrl: 'my-trophies-item.component.html',
  styleUrls: ['./my-trophies-item.component.scss'],
  providers: [ImageCarPipe],
})
export class MyTrophiesItemComponent implements OnInit {
  @Input() item: WinnerGetAllUserWinnersI;
  @Input() tournament: Tournament;
  @Input() open = false;
  backgroundImage: string;
  @Output() goToTournament: EventEmitter<string> = new EventEmitter<string>();
  constructor(private imageCarPipe: ImageCarPipe) {}

  ngOnInit() {
    // this.setImageForBackground();
  }

  // setImageForBackground() {
  //   if (this.car) {
  //     const image = {
  //       url: this.imageCarPipe.transform(
  //         this.car.images && this.car.images.length > 0 ? this.car.images : null
  //       ),
  //     };
  //     this.backgroundImage = `
  //               linear-gradient(rgba(0, 0, 0, 0.43),
  //               rgba(0, 0, 0, 0.43)),
  //               url('${image.url}')
  //           `;
  //     console.log(this.backgroundImage);
  //   }
}
