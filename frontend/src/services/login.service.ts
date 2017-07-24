import { Injectable } from '@angular/core';
import { UnAuthenticatedUser } from '../domain/unauthenticated-user';
import { Inject } from '@angular/core';

import { Http } from '@angular/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

@Injectable()
export class LoginService {

  private static readonly POST_SESSION_REQUEST_OPTIONS: RequestOptions = new RequestOptions({
    headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' })
  });

  constructor(@Inject(Http) private http: Http) { }

  getSession(user: UnAuthenticatedUser): void {
    this.http.post('/session', user.toXWWWFormUrlEncoded(), LoginService.POST_SESSION_REQUEST_OPTIONS )
      .subscribe( (resp) => console.log(resp) );
  }


}
