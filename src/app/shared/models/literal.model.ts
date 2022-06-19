export class Literal {
  _id?: string;
  name: string;
  es?: string;
  en?: string;
  constructor(data?: Literal) {
    this._id = data?._id;
    this.name = data?.name ?? '';
    this.es = data?.es;
    this.en = data?.en;
  }
}
