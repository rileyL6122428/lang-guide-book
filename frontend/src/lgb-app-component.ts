import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { AppRoutes } from './routing/routes';
import { NavigationStart } from '@angular/router';
import { Inject } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
})
export class LGBAppComponent {
  constructor(
    @Inject(Router) private router: Router,
    @Inject(AppRoutes) private routes: AppRoutes
  ) {

    router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe((event: NavigationStart) => {
        debugger;
        let urlRequireAuth = routes.requiresAuthentication(event.url);
        console.log(event);
      })
  }
}
