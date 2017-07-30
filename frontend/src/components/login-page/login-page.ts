import { Component } from '@angular/core';
import { UnAuthenticatedUser } from '../../domain/unauthenticated-user';
import { LoginService } from '../../services/login.service';
import { Inject } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  template: `
  <section id="login-page">
    <form id="login">
      <h1>Login</h1>
      <input id="username" type="text" [(ngModel)]="user.name" name="username" placeholder="username"/>
      <input id="password" type="password" [(ngModel)]="user.password" name="password" placeholder="password" />
      <button id="login" (click)="login()">Submit</button>
    </form>
  </section>
  `,
})
export class LoginComponent {

  private user:UnAuthenticatedUser = new UnAuthenticatedUser();

  constructor(
    @Inject(LoginService) private loginService:LoginService,
    @Inject(Router) private router: Router
  ) { }

  login(): void {
    this.loginService.postSession(
      this.user,
      this.loginResponseReceived.bind(this)
    );
  }

  loginResponseReceived(backendLoginSuccessful: boolean): void {
    if(backendLoginSuccessful)
      this.router.navigateByUrl("dashboard");
  }

}
