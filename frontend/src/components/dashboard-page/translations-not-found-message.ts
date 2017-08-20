import { Component } from '@angular/core';

@Component({
  selector:'translations-not-found-message',

  template:`
  <article id="translations-not-found-message">
    <p>
      We couldn't find any translations for your account. One of the
      following scenarios has probably occurred:
    </p>

    <ul>
      <li>Our servers are momentarily down</li>
      <li>Your machine has lost its internet connection</li>
      <li>You have not created any translations</li>
    </ul>

    <p>
      In the case that you have not created any translations, you can
      click the plus button above to make a new translation.
    </p>
  </article>
  `
})
export class TranslationsNotFoundMessage {

}
