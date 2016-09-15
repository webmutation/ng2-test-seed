import {LanguagesServiceHttp} from "../app/languages-service";
import {async, inject, TestBed} from "@angular/core/testing";
import {HttpModule} from "@angular/http";

describe('Service: LanguagesServiceHttp', () => {
    let service;

    beforeEach(() => {
        //Import the HTTPModule so we can use HTTP services,
        //we will fetch the data from LanguagesServiceHttp so we will import it as our provider.
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [LanguagesServiceHttp]
        });
    });


    //We will request ou list of languages for that we will inject the LanguagesService
    //Call the get method and subscribe to the response,
    //assert that the response contains the expected results and is the size we expected.
    it('should return available languages', async(
        inject(
            [LanguagesServiceHttp], (service) => {

                service.get().subscribe(response => {
                    expect(response).toContain('en');
                    expect(response).toContain('es');
                    expect(response).toContain('fr');
                    expect(response.length).toEqual(3);
                });
            })));
});