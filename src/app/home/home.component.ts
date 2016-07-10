import { Component } from '@angular/core';

import { Title } from './title';
import { XLarge } from './x-large';

@Component({

  selector: 'home',
  providers: [
    Title
  ],

  directives: [
    XLarge
  ],
  styleUrls: [ './home.style.css' ],
  templateUrl: './home.template.html'
})
export class Home {

  constructor(
    public title: Title
  ) { }

  submitState(value) {
    console.log('submitState', value);
  }

}
