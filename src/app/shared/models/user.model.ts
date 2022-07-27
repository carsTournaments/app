export class User {
  _id?: string;
  email: string;
  name: string;
  country: string;
  role: string;
  fcm?: string;
  password?: string;
  created?: string;
  updated?: string;

  constructor(data?: User) {
    this._id = data?._id;
    this.email = data?.email || '';
    this.name = data?.name || '';
    this.country = data?.country || 'es';
    this.role = data?.role || '';
    this.fcm = data?.fcm || '';
    this.password = data?.password;
    this.created = data?.created;
    this.updated = data?.updated;
  }
}
