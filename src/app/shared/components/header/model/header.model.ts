import { Image } from '@models';

interface RightButtonI {
  state: boolean;
  icon: string;
}

export class Header {
  title: string;
  segments? = {
    items: [],
    selected: 0,
    state: true,
  };
  image?: Image;
  backButton? = {
    state: false,
    route: '',
    default: true,
  };
  rightButtons?: RightButtonI[] = [];
  constructor(data?: Header) {
    this.title = data?.title;
    this.segments = data?.segments;
    this.image = data?.image;
    if (data && data.backButton) {
      this.backButton.state = data?.backButton?.state ?? false;
      this.backButton.route = data?.backButton?.route;
      this.backButton.default = data?.backButton.default ?? true;
    }
    this.rightButtons = data?.rightButtons;
  }
}
