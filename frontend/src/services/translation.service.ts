import { Injectable, Inject } from '@angular/core';

import { CurrentUserStore } from '../container/current-user-store';
import { TranslationStore } from '../container/translation-store';

import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class TranslationService {

  constructor(
    @Inject(TranslationStore) private translationStore: TranslationStore,
    @Inject(CurrentUserStore) private currentUserStore: CurrentUserStore,
    @Inject(Http) private http: Http
  ) { }

  getCurrentUserTranslations(responseReceivedCallback: Function):void {

    this.http.get(
      "/translations", { params: {
        translatorName: this.currentUserStore.getCurrentUserName(),
        username: this.currentUserStore.getCurrentUserName()
      }
    })
      .subscribe((response) => {
        responseReceivedCallback(response);
      });
  }

  private getCurrentUserTranslationsSearchParams(): URLSearchParams {
    let searchParams: URLSearchParams = new URLSearchParams();

    searchParams.set("translatorName", this.currentUserStore.getCurrentUserName());
    searchParams.set("username", this.currentUserStore.getCurrentUserName());
    debugger
    return searchParams;
  }

}
