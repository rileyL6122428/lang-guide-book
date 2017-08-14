import { Injectable } from '@angular/core';
import { UnAuthenticatedUser } from '../domain/unauthenticated-user';
import { AuthenticatedUser } from '../domain/authenticated-user';
import { Inject } from '@angular/core';

import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CurrentUserStore } from '../container/current-user-store';

@Injectable()
export class AuthenticationService {

  private static SESSION_REQUEST_OPTIONS: RequestOptions = new RequestOptions({
    headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  });

  private static SESSION_REQUEST_PATH: string = '/session';

  constructor(
    @Inject(Http) private http: Http,
    @Inject(CurrentUserStore) private currentUserStore: CurrentUserStore
  ) { }

  public postSession(unAuthenticatedUser: UnAuthenticatedUser, responseReceivedCallback: Function): void {
    this.http.post(
      AuthenticationService.SESSION_REQUEST_PATH,
      unAuthenticatedUser.toXWWWFormUrlEncoded(),
      AuthenticationService.SESSION_REQUEST_OPTIONS
    )
      .subscribe( (response) => {
        this.storeUser(response.json())
        responseReceivedCallback(response.ok);
      });
  }

  private storeUser(responseBody: Object): void {
    let authenticatedUser: AuthenticatedUser = AuthenticatedUser.fromPOJO(responseBody);
    this.currentUserStore.storeUser(authenticatedUser);
  }

  public deleteSession(): void {
    this.http.delete(AuthenticationService.SESSION_REQUEST_PATH);
    this.currentUserStore.removeUser();
  }

}
