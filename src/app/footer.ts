import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
	selector: 'my-about',
	template: `
	  <span>The PIN Machine is a test application</span>
	`
})
export class AboutComp {
	title: string;
}

@Component({
	selector: 'my-hint',
	template: `
	  <span>The PIN Machine was build in 2015</span>
	`
})
export class HintComp {
	title: string;
}

@Component({
	selector: 'my-footer',
	template: `
	  <div>
	    <a [routerLink]="['About']">About</a>
        <a [routerLink]="['Hint']">Hint</a>
      </div>
      <router-outlet></router-outlet>
    `,
    directives: [AboutComp, HintComp, ROUTER_DIRECTIVES]
})
export class MyFooterComp {
}
