import { User } from './user'

export class UnAuthenticatedUser extends User {

  password: String;

  constuctor() {
    this.password = "";
  }

  public toXWWWFormUrlEncoded() {
    return `username=${this.name}&password=${this.password}`;
  }

}
