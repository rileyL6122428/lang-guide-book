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

  getCurrentUserTranslations(): Translation[] {
    return this.translationStore.getTranslations(this.currentUserStore.getUsername());
  }

  fetchCurrentUserTranslations(responseReceivedCallback: Function): void {
    this.http.get(
      TranslationService.TRANSLATION_REQUEST_PATH,
      this.currentUserTranslationRequestData()
    )
      .subscribe((response) => {
        this.translationStore.storeTranslations(this.currentUserStore.getUsername(), response.json());
        responseReceivedCallback(this.getCurrentUserTranslations());
      });
  }

  private currentUserTranslationRequestData(): Object {
    return {
      params: {
        translatorName: this.currentUserStore.getUsername(),
        username: this.currentUserStore.getUsername()
      }
    };
  }

}
