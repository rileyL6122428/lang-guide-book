import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: "translator-header",
  template: `
    <section id='authenticated-user-header'>

      <h3 id='site-header'>
        <div>(IMAGE PLACE HOLDER)</div>
        <p>LGB</p>
      </h3>

      <ul id='header-links'>
        <li>{{username}}</li>
        <li><button id="log-out" (click)="logOut()">Log out</button></li>
      </ul>
    </section>
  `
})
export class TranslatorHeader implements OnInit {

  private username: string;

  constructor(
    @Inject(AuthenticationService) private authenticationService: AuthenticationService,
    @Inject(Router) private router: Router
  ) { }

  ngOnInit() {
    this.username = this.authenticationService.getUsername();
  }

  logOut(): void {
    this.authenticationService.deleteSession();
    this.router.navigateByUrl("home");
  }

}
