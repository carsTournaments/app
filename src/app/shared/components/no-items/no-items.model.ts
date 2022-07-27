export class NoItemsModel {
  title = '';
  subtitle = '';

  constructor(options: NoItemsModel) {
    this.title = options.title || '';
    this.subtitle = options.subtitle || '';
  }
}
