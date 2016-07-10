import { Component, ViewEncapsulation } from '@angular/core';

import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
<md-content>
<md-toolbar color="primary">
<span>{{ name }}</span>
<span class="fill"></span>
<a md-button router-active [routerLink]=" ['home'] ">
Home
</a>
<a md-button router-active [routerLink]="['bot']">
Bot
</a>
<a md-button router-active [routerLink]=" ['about'] ">
About
</a>
</md-toolbar>

<md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>

<router-outlet></router-outlet>

<footer>
<span id="footerText">Made with <a [href]="githubUrl">WebPack Angular 2 Starter</a> by <a [href]="url">@AngularClass</a></span>
</footer>
</md-content>
`,
  directives: [ROUTER_DIRECTIVES]
})

export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Simple Chat Bot App';
  url = 'https://twitter.com/AngularClass';
  githubUrl = 'https://github.com/AngularClass/angular2-webpack-starter/tree/material2';

  constructor() { }

}
