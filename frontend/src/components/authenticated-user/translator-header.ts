import { Component } from '@angular/core';

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
        <li>Log out</li>
      </ul>
    </section>
  `
})
export class TranslatorHeader { }
