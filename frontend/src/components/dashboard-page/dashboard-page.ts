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

          <translations-not-found-message *ngIf="canShowMessage() && canShowNoWorksMessage()">
          </translations-not-found-message>

          <ul id="works" *ngIf="canShowMessage() && canShowWorks()">
            <li *ngFor="let work of works;">
              <a [routerLink]="['/translation', work.id]">
                {{work.name}}
              </a>
            </li>
          </ul>

        </section>
      </section>

      <loading-circle *ngIf="!canShowMessage()"></loading-circle>
    </section>
  `,
})
export class DashboardPageComponent implements OnInit {

  private static  MINIMUM_LOAD_TIME: number = 1;

  private works: Translation[];
  private minimumLoadTimeExceeded: boolean;
  private fetchTranslationsFinished: boolean;
  private elapsedLoadTime: number;
  private serviceCallFinished: boolean;
  private translationsEmptyBeforeServiceCall: boolean;

  constructor(
    @Inject(TranslationService) private translationService: TranslationService
  ) { }

  public ngOnInit() {
    this.works = this.translationService.getCurrentUserTranslations();
    debugger
    this.translationsEmptyBeforeServiceCall = this.works.length === 0;
    if(this.translationsEmptyBeforeServiceCall) {
      debugger
      this.startCentralLoadCircle();
    }

    this.serviceCallFinished = false;
    this.translationService.fetchCurrentUserTranslations((translations: Translation[]) => {
        this.works = translations;
        debugger
        this.serviceCallFinished = true;
    });
  }

  public canShowMessage(): boolean {
    return  (this.serviceCallFinished &&
            this.minimumLoadTimeExceeded) || !this.translationsEmptyBeforeServiceCall;
  }

  public canShowNoWorksMessage(): boolean {
    return this.works.length === 0;
  }

  public canShowWorks(): boolean {
    return this.works.length > 0;
  }

  private startCentralLoadCircle(): void {
    this.minimumLoadTimeExceeded = false;
    this.elapsedLoadTime = 0;
    debugger
    let incrementLoadToken = setInterval(() => {
      this.elapsedLoadTime += 0.5;
      debugger
      if(this.elapsedLoadTime >= DashboardPageComponent.MINIMUM_LOAD_TIME) {
        debugger
        this.minimumLoadTimeExceeded = true;
        clearInterval(incrementLoadToken);
      }
    }, 500);
  }

}
