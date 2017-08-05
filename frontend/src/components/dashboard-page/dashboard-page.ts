import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { Inject } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  template: `
    <section id='dashboard-page'>
      <translator-header></translator-header>

      <section id='dashboard-widgets'>
        <section id='translators-works'>
          <h3>Your Works</h3>

          <div id="list-interaction-widget">
            <button id="new-translation">
              <div id="plus-icon">+</div>
            </button>

            <input id="translations-filter" type="text" placeholder="filter" />
          </div>

          <ul id="works">
            <li>EXAMPLE TITLE 1</li>
            <li>EXAMPLE TITLE 2</li>
            <li>EXAMPLE TITLE 3</li>
          </ul>

        </section>
      </section>
    </section>
  `,
})
export class DashboardPageComponent { }
