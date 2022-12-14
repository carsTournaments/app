import { Image } from '@models';

export class Header {
  title: string;
  segments? = {
    items: [],
    selected: 0,
    state: true,
  };
  image?: Image;
  backButton?: {
    state?: boolean;
    route?: string;
  };
  rightButton? = {
    state: false,
    icon: '',
  };
  constructor(data?: Header) {
    this.title = data?.title;
    this.segments = data?.segments;
    this.image = data?.image;
    this.backButton = data?.backButton;
    this.rightButton = data?.rightButton;
  }
}
