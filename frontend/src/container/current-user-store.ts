import { Injectable } from '@angular/core';
import { AuthenticatedUser } from '../domain/authenticated-user';

@Injectable()
export class CurrentUserStore {

  private authenticatedUser: AuthenticatedUser;

  constructor() {
    this.authenticatedUser = null;
  }

  public storeUser(userPOJO:Object): void {
    this.authenticatedUser = AuthenticatedUser.fromPOJO(userPOJO);
  }

  public userLoggedIn(): boolean {
    return !!this.authenticatedUser;
  }

  public removeUser(): void {
    this.authenticatedUser = null;
  }
}
