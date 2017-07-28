import { User } from './user'

export class AuthenticatedUser extends User {

  public static fromPOJO(pojo: Object): AuthenticatedUser {
    let user: AuthenticatedUser = new AuthenticatedUser();
    user.name = pojo["name"];
    user.sessionToken = pojo["sessionToken"];
    return user;
  }

  sessionToken: string;

}
