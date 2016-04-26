import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';
import {GreetingComponent} from './greeting-component';
import {BorderComponent} from './border-component';
import {MyFooterComp, AboutComp, HintComp} from './footer';

@Component({
  selector: 'my-app',
  template: `
    <my-fancy-border title="The PIN Machine">
      <my-greeting></my-greeting>
    </my-fancy-border>
    <div>
    <my-footer></my-footer>
  `,
  directives: [GreetingComponent, BorderComponent, MyFooterComp]
})
@RouteConfig([
  { path: '/', name: 'About', component: AboutComp, useAsDefault: true },
  { path: '/hint', name: 'Hint', component: HintComp }
])
export class AppComponent {
}
