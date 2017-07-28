import { User } from './user'

export class UnAuthenticatedUser extends User {

  password: string;

  constuctor() {
    this.password = "";
  }

  public toXWWWFormUrlEncoded() {
    return `username=${this.name}&password=${this.password}`;
  }

}
