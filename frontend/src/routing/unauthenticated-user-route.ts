import { Route } from '@angular/router';

export class UnAuthenticatedUserRoute implements Route {
  path:string;
  component:any;

  constructor(params: Object) {
    this.path = params['path'];
    this.component = params['component'];
  }
}
