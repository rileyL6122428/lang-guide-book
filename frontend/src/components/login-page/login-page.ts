import { Component } from '@angular/core';
import { UnAuthenticatedUser } from '../../domain/unauthenticated-user'

@Component({
  template: `
  <section id="login-page">
    <form>
      <h1>Login</h1>
      <input type="text" [(ngModel)]="user.name" name="username" placeholder="username"/>
      <input type="password" [(ngModel)]="user.password" name="password" placeholder="password" />
      <button (click)="login()">Login</button>
    </form>
  </section>
  `,
})
export class LoginComponent {

  user:UnAuthenticatedUser = new UnAuthenticatedUser();

  login() {
    console.log("username = " + this.user.name);
    console.log("password = " + this.user.password);
  }

}
