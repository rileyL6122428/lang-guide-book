import { Route } from '@angular/router';
import { Component } from '@angular/core';

export class AuthenticatedUserRoute implements Route {

  path:string;
  component:any;

  constructor(params: Object) {
    this.path = params['path'];
    this.component = params['component'];
  }

}
