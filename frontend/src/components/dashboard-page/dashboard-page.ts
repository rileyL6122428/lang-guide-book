import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { Inject } from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
  template: `
    <div>THIS IS THE DASHBOARD PAGE</div>
  `,
})
export class DashboardPageComponent { }
