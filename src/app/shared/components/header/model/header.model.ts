import { Image } from '@models/image.model';

export class Header {
    title: string;
    segments? = {
        items: [],
        selected: 0,
    };
    image?: Image;
    backButton? = {
        state: false,
        route: '',
        default: true,
    };
    rightButton? = {
        state: false,
        icon: '',
    };
    constructor(data?: Header) {
        this.title = data?.title;
        this.segments = data?.segments;
        this.image = data?.image;
        if (data && data.backButton) {
            this.backButton.state = data?.backButton?.state ?? false;
            this.backButton.route = data?.backButton?.route;
            this.backButton.default = data?.backButton.default ?? true;
        }
        this.rightButton = data?.rightButton;
    }
}
