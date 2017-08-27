import { Component, Inject, OnInit, OnDestroy } from '@angular/core';

import { TranslationService } from '../../services/translation.service';
import { Translation } from '../../domain/Translation';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <section id="translation-overview">
      THIS IS THE TRANSLATION OVERVIEW PAGE
    </section>
  `
})
export class TranslationOverviewComponent implements OnInit, OnDestroy {

  private translation: Translation;
  private parameterChangeSubscription: any;

  constructor(
    @Inject(TranslationService) private translationService: TranslationService,
    @Inject(ActivatedRoute) private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.parameterChangeSubscription = this.route.params.subscribe((params: any) => {

      this.translation = this.translationService.getTranslation(+params.id, null);

      console.log(this.translation);
    });
  }

  ngOnDestroy(): void {
    this.parameterChangeSubscription.unsubscribe();
  }

}
