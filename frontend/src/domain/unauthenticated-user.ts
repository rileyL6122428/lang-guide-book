import { User } from './user'

export class UnAuthenticatedUser extends User {

  password: String;

  constuctor() {
    this.password = "";
  }

}
