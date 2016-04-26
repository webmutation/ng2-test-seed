import {
  iit,
  it,
  ddescribe,
  describe,
  expect,
  async,
  inject,
  TestComponentBuilder,
  beforeEach,
  beforeEachProviders
} from 'angular2/testing';
import { Component, Directive } from 'angular2/core';
import { MyFooterComp } from '../app/footer';
import { RouterLink, RouterOutlet } from 'angular2/router';

// @RouteConfig([
//   { path: '/', name: 'About', component: AboutComp, useAsDefault: true },
//   { path: '/hint', name: 'Hint', component: HintComp }
// ])
@Directive({
  selector: `[router-link]`
})
class MockRouterLink {}

@Component({
  selector: `router-outlet`,
  template: `<div></div>`
})
class MockRouterOutlet {}

@Component({
  selector: 'dummy',
  template: `<span>Stuff</span>`
})
class DummyComp {
}

@Component({
  template: '<my-footer></my-footer>',
  directives: [MyFooterComp]
})
class TestComponent {
}

ddescribe('greeting component', () => {
  var builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb
        .overrideDirective(TestComponent, RouterLink, MockRouterLink)
        .overrideDirective(TestComponent, RouterOutlet, MockRouterOutlet);
  }));

  it('should display the footer template', async(() => {
    builder.createAsync(TestComponent).then((fixture) => {
      expect(fixture.nativeElement).toContainText('About Hint');
    });
  }));
});
