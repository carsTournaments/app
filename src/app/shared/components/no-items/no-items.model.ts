export class NoItemsModel {
  title = '';
  subtitle = '';
  state?: boolean;

  constructor(options: NoItemsModel) {
    this.title = options.title || '';
    this.subtitle = options.subtitle || '';
    this.state = options.state && options.state === true ? true : false;
  }
}
