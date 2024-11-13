export default class User {
  _id?: string;
  email: string;
  username: string;
  password: string;

  constructor(opts: {
    email: string;
    username: string;
    password: string;
    _id?: string;
  }) {
    this.email = opts.email;
    this.username = opts.username;
    this.password = opts.email;
    this._id = opts.id;
  }
}
