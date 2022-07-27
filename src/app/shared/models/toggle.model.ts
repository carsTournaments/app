export class Toggle {
  _id?: string;
  name: string;
  description: string;
  state: boolean;
  created?: string;
  updated?: string;

  constructor(data?: Toggle) {
    this._id = data?._id;
    this.name = data?.name ?? '';
    this.description = data?.description ?? '';
    this.state = data?.state ?? false;
    this.created = data?.created;
    this.updated = data?.updated;
  }
}
