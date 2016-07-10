import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Title {
  value = 'Angular 2';
  constructor(public http: Http) {}

  /***
   * getData
   *
   * Gets the data.
   */
  getData() {
    console.log('Title#getData(): Get Data');

    return {
      value: 'AngularClass'
    };
  }

}
