import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

import { TranslationStore } from '../container/translation-store';

@Injectable()
export class TranslationService {

  constructor(
    @Inject(TranslationStore) private translationStore: TranslationStore
  ) { }

}
