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

          <translations-not-found-message *ngIf="minimumLoadTimeExceeded && !canShowUserWorks()">
          </translations-not-found-message>

          <ul id="works" *ngIf="minimumLoadTimeExceeded && canShowUserWorks()">
            <li *ngFor="let work of works;">
              <a [routerLink]="['/translation', work.id]">
                {{work.name}}
              </a>
            </li>
          </ul>

        </section>
      </section>

      <loading-circle *ngIf="!minimumLoadTimeExceeded"></loading-circle>
    </section>
  `,
})
export class DashboardPageComponent implements OnInit {

  private static  MINIMUM_LOAD_TIME: number = 1;

  private works: Translation[];
  private minimumLoadTimeExceeded: boolean;
  private fetchTranslationsFinished: boolean;

  constructor(
    @Inject(TranslationService) private translationService: TranslationService
  ) { }

  public ngOnInit() {
    this.startCentralLoadCircle();

    this.works = this.translationService.getCurrentUserTranslations(
      (translations: Translation[]) => this.works = translations
    );
  }

  public canShowUserWorks(): boolean {
    return this.works && this.works.length !== 0;
  }

  private startCentralLoadCircle(): void {
    this.minimumLoadTimeExceeded = false;
    let elapsedLoadTime = 0;

    let incrementLoadToken = setInterval(() => {
      elapsedLoadTime += 0.5;

      if(elapsedLoadTime >= DashboardPageComponent.MINIMUM_LOAD_TIME) {
        this.minimumLoadTimeExceeded = true;
        clearInterval(incrementLoadToken);
      }
    }, 500);
  }

}
