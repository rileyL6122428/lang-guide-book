import { Component } from '@angular/core';

@Component({
  template: `
  <section id="home-page">
    <h1>
      <div id="header-image">(Image Place Holder)</div>
      <p id="header-text">Language Guide Book</p>
    </h1>
    <p id="welcome-paragraph">
      Welcome to the Language Guide Book, a guide book for video games played
      in foreign languages!
    </p>

    <section id="what-you-can-do">
      <p>On this site, you can:</p>
      <ul>
        <li>Create and manage translations</li>
        <li>Read through and download other people's translations</li>
      </ul>
    </section>

    <section id="getting-started">
      <p>New users can click here to get started.</p>
      <p>Returning users can click <a routerLink="/login">here</a> to login.</p>
    </section>

  </section>
  `,
})
export class HomePageComponent { }
