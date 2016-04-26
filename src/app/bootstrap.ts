import {bootstrap} from 'angular2/platform/browser';
import {UserService} from './user-service';
import {AppComponent} from './app-component';
import {LoginService} from './login-service';
import {ROUTER_PROVIDERS} from 'angular2/router';


bootstrap(AppComponent, [LoginService, UserService, ROUTER_PROVIDERS]);
