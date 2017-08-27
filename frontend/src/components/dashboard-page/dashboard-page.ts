import { Component, Inject, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';

import { TranslationService } from '../../services/translation.service';

import { Translation } from '../../domain/translation';

@Component({
  template: `
    <section id='dashboard-page'>

      <translator-header>
      </translator-header>

      <section id='dashboard-widgets'>
        <section id='translators-works'>
          <h3>Your Works</h3>

          <div id="list-interaction-widget">
            <button id="new-translation">
              <div id="plus-icon">+</div>
            </button>

            <input id="translations-filter" type="text" placeholder="filter" />
          </div>

          <translations-not-found-message *ngIf="!canShowUserWorks()">
          </translations-not-found-message>

          <ul id="works" *ngIf="canShowUserWorks()">
            <li *ngFor="let work of works;">
              <a [routerLink]="['/translation', work.id]">
                {{work.name}}
              </a>
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

  public ngOnInit() {
    this.works = this.translationService.getCurrentUserTranslations(
      (translations: Translation[]) => this.works = translations
    );
  }

  public canShowUserWorks(): boolean {
    return this.works && this.works.length !== 0;
  }

}
