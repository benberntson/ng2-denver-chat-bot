/*
 * Providers provided by Angular
 */
import { bootstrap } from '@angular/platform-browser-dynamic';

/*
 * Platform and Environment
 * our providers/directives/pipes
 */
import { PLATFORM_PROVIDERS } from './platform/browser';
import { ENV_PROVIDERS, decorateComponentRef } from './platform/environment';


/*
 * App Component
 * our top level component that holds all of our components
 */
import { App } from './app';

import { APP_ROUTE_PROVIDERS } from './app/app.routes';

import { ConvoService } from './app/bot/convo/convo.service';

export function main(initialHmrState?: any): Promise<any> {

  return bootstrap(App, [

      ...PLATFORM_PROVIDERS,
      ...ENV_PROVIDERS,
    APP_ROUTE_PROVIDERS,
    ConvoService
  ])
    .then(decorateComponentRef)
    .catch(err => console.error(err));

}

if ('development' === ENV && HMR === true) {
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  document.addEventListener('DOMContentLoaded', () => main());
}
