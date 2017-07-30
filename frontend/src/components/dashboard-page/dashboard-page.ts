import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { Inject } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  template: `
    <section id='dashboard-page'>
      <translator-header></translator-header>

      <section id='dashboard-widgets'>
        <section id='translators-works'>
          this is the translator's works section
        </section>
      </section>
    </section>
  `,
})
export class DashboardPageComponent { }
