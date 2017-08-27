import { Translation } from '../domain/translation';
import 'rxjs/add/operator/filter';

export class TranslationStore {

  private _translations: Map<number, Translation>;

  constructor() {
    this._translations = new Map<number, Translation>();
  }

  getTranslations(ownerName: string): Array<Translation> {
    let translationsForOwner = new Array<Translation>();

    this._translations.forEach((translation: Translation, key: number) => {

      if(translation.ownerName === ownerName)
        translationsForOwner.push(translation);
    });

    return translationsForOwner;
  }

  getTranslation(id: number): Translation {
    return this._translations.get(id);
  }

  storeTranslation(translation: Translation): void {

    this._translations.set(translation.id, translation);
  }

  storeTranslations(ownerName: string, translationPOJOs: Object[]): void {
    translationPOJOs.forEach((translationPOJO: Object) => {
      let translation: Translation = Translation.fromPOJO(ownerName, translationPOJO);
      this.storeTranslation(translation);
    });
  }
}
