import { Injectable, Inject } from '@angular/core';

import { CurrentUserStore } from '../container/current-user-store';
import { TranslationStore } from '../container/translation-store';

import { Translation } from '../domain/Translation';

import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class TranslationService {

  private static readonly TRANSLATION_REQUEST_PATH: string = "/translations";

  constructor(
    @Inject(TranslationStore) private translationStore: TranslationStore,
    @Inject(CurrentUserStore) private currentUserStore: CurrentUserStore,
    @Inject(Http) private http: Http
  ) { }

  getTranslation(id: number, responseReceivedCallback: Function): Translation {
    return this.translationStore.getTranslation(id);
  }

  getCurrentUserTranslations(responseReceivedCallback: Function): Translation[] {
    this.http.get(
      TranslationService.TRANSLATION_REQUEST_PATH,
      { params: this.getCurrentUserTranslationsSearchParams() }
    )
      .subscribe((response) => {

        this.translationStore.storeTranslations(this.currentUserStore.getUsername(), response.json());
        let currentUserTranslations = this.translationStore.getTranslations(
          this.currentUserStore.getUsername()
        );
        responseReceivedCallback(currentUserTranslations);
      });

    return this.translationStore.getTranslations(this.currentUserStore.getUsername());
  }

  private getCurrentUserTranslationsSearchParams(): Object {
    return {
      translatorName: this.currentUserStore.getUsername(),
      username: this.currentUserStore.getUsername()
    };
  }

}
