import { Component, Inject, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

import { TranslationService } from '../../services/translation.service';

import { Translation } from '../../domain/translation';

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
            <li *ngFor="let work of works;">
              {{work.name}}
            </li>
          </ul>

        </section>
      </section>
    </section>
  `,
})
export class DashboardPageComponent implements OnInit {

  private works: Translation[];

  constructor(
    @Inject(TranslationService) private translationService: TranslationService
  ) { }

  ngOnInit() {
    this.translationService.getCurrentUserTranslations((response: any) => {
      debugger
      this.works = response.json().map(
        (translationPOJO: Object) => Translation.fromPOJO(translationPOJO)
      );
      console.log(response);
    })
  }

}
