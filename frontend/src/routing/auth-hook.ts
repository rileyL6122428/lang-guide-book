import { Injectable, Inject } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { CurrentUserStore } from '../container/current-user-store';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationHook implements CanActivate {

  constructor( @Inject(CurrentUserStore) private currentUserStore: CurrentUserStore ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.currentUserStore.userLoggedIn();
  }
}
