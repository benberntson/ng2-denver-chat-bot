import { WebpackAsyncRoute } from '@angularclass/webpack-toolkit';
import { provideRouter, RouterConfig } from '@angular/router';
import { Home } from './home/home.component.ts';
import { NoContent } from './no-content';
import { Bot } from './bot/bot.component';
import { Convo } from './bot/convo/convo.component';

export const routes: RouterConfig = [
  {
    path: '',
    component: Home
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'bot',
    component: Bot
  },
  {
    path: 'bot/conversation',
    component: Convo
  },
  {
    path: 'about',
    component: 'About'
  },
  {
    path: '**',
    component: NoContent
  }
];

export const APP_ROUTE_PROVIDERS = [provideRouter(routes)];

export const asyncRoutes: AsyncRoutes = {
  'About': require('es6-promise-loader!./about'),
};

export const prefetchRouteCallbacks: Array<IdleCallbacks> = [
  asyncRoutes['About'],
  asyncRoutes['Detail'],
];
