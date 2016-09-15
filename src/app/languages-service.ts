import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";


@Injectable()
export class LanguagesServiceHttp {
    constructor(private http:Http) { }

    get(){
        return this.http.get('built/api/languages.json')
            .map(response => response.json());
    }
}