import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: "translator-header",
  template: `
    <section id='authenticated-user-header'>

      <div id='site-header'>
        <div>IMAGE PLACE HOLDER</div>
        <h3>LGB</h3>
      </div>

      <ul id='header-links'>
        <li>USER NAME</li>
        <li><button (click)="logOut()">Log out</button></li>
      </ul>
    </section>
  `
})
export class TranslatorHeader {

  constructor(
    @Inject(AuthenticationService) private authenticationService: AuthenticationService,
    @Inject(Router) private router: Router
  ) { }

  logOut(): void {
    this.authenticationService.deleteSession();
    this.router.navigateByUrl("home");
  }

}
