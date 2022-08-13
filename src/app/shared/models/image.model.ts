export class Image {
  _id?: string;
  type?: any;
  car?: any;
  tournamnet?: any;
  url?: string;
  firstImage?: boolean;
  position?: number;
  created?: string;
  updated?: string;

  constructor(data?: Image) {
    this._id = data?._id;
    this.type = data?.type;
    this.car = data?.car;
    this.tournamnet = data?.tournamnet;
    this.url = data?.url;
    this.firstImage = data?.firstImage;
    this.position = data?.position;
    this.created = data?.created;
    this.updated = data?.updated;
  }
}
