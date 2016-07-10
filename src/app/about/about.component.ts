import { Component } from '@angular/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');

@Component({
  selector: 'about',
  styles: [`
h1 {
font-family: Arial, Helvetica, sans-serif
}
md-card{
margin: 25px;
}
a:link{
color: black;
text-decoration: none;
}
a:visited {
color: purple;
}
a:hover{
cursor: pointer;
}
.email{
display: inline-block;
font-size: 22px;
}
`],
  template: `
<md-card>
<h4>Summary:</h4>
<br>
This is a simple 'chat bot' application I've created.
The application runs entirely client side. I'm planning on putting
the application logic in a service titled chat-bot.service.ts
</md-card>
<md-card>
<p>
Made with <i class="material-icons">favorite</i> by Ben Berntson
</p>
<a [href]="emailMailto">
<span class="email">
Benjamin.Berntson@gmail.com
</span>&nbsp;
<i class="material-icons">email</i>
</a>
</md-card>
`,
  host:{'class': 'ng-animate '}
})
export class About {
  emailMailto = "mailto:benjamin.berntson@gmail.com";

  constructor() {

  }

  ngOnInit() {
    console.log('hello `About` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    // this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    // var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
    // setTimeout(() => {
    //
    //   let asyncDataPromise = asyncMockDataPromiseFactory();
    //   asyncDataPromise.then(json => {
    //     console.log('async mockData', json);
    //   });
    //
    // });
  }

}
