import { Injectable, Inject } from '@angular/core';

import { CurrentUserStore } from '../container/current-user-store';
import { TranslationStore } from '../container/translation-store';

import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class TranslationService {

  private static readonly TRANSLATION_REQUEST_PATH: string = "/translations";

  constructor(
    @Inject(TranslationStore) private translationStore: TranslationStore,
    @Inject(CurrentUserStore) private currentUserStore: CurrentUserStore,
    @Inject(Http) private http: Http
  ) { }

  getCurrentUserTranslations(responseReceivedCallback: Function):void {

    this.http.get(
      TranslationService.TRANSLATION_REQUEST_PATH,
      { params: this.getCurrentUserTranslationsSearchParams() }
    )
      .subscribe((response) => {
        responseReceivedCallback(response);
      });
  }

  private getCurrentUserTranslationsSearchParams(): Object {
    return {
      translatorName: this.currentUserStore.getCurrentUserName(),
      username: this.currentUserStore.getCurrentUserName()
    };
  }

}
