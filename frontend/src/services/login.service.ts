import { Injectable } from '@angular/core';
import { UnAuthenticatedUser } from '../domain/unauthenticated-user';
import { AuthenticatedUser } from '../domain/authenticated-user';
import { Inject } from '@angular/core';

import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

import { Subscription } from 'rxjs';

import { CurrentUserStore } from '../container/current-user-store';

@Injectable()
export class LoginService {

  private static readonly POST_SESSION_REQUEST_OPTIONS: RequestOptions = new RequestOptions({
    headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  });

  private static readonly POST_SESSION_PATH: string = '/session';

  constructor(
    @Inject(Http) private http: Http,
    @Inject(CurrentUserStore) private currentUserStore: CurrentUserStore,
  ) { }

  public postSession(unAuthenticatedUser: UnAuthenticatedUser, successCallback: Function): void {
    this.http.post(
      LoginService.POST_SESSION_PATH,
      unAuthenticatedUser.toXWWWFormUrlEncoded(),
      LoginService.POST_SESSION_REQUEST_OPTIONS
    )
      .subscribe( (response) => {
        this.storeUser(response.json())
        successCallback(response.ok);
      });
  }

  private storeUser(responseBody: Object): void {
    let authenticatedUser: AuthenticatedUser = AuthenticatedUser.fromPOJO(responseBody);
    this.currentUserStore.storeUser(authenticatedUser);
  }

}
