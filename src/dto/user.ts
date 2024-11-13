import { ObjectId } from 'mongodb';

export default class User {
  _id?: ObjectId;
  email: string;
  username: string;
  password: string;

  constructor(opts: {
    email: string;
    username: string;
    password: string;
    _id?: ObjectId;
  }) {
    this.email = opts.email;
    this.username = opts.username;
    this.password = opts.email;
    this._id = opts._id;
  }
}
