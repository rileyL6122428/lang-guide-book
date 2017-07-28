import { Injectable } from '@angular/core';
import { AuthenticatedUser } from '../domain/authenticated-user';

@Injectable()
export class CurrentUserStore {

  private authenticatedUser: AuthenticatedUser;

  public storeUser(userPOJO:Object): void {
    this.authenticatedUser = AuthenticatedUser.fromPOJO(userPOJO);
  }

  public userLoggedIn(): boolean {
    return this.authenticatedUser !== null;
  }
}
