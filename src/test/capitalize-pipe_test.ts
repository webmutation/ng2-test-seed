import {TestBed, inject, async} from "@angular/core/testing";
import {CapitalisePipe} from "../app/capitalize-pipe";

describe('Pipe: CapitalisePipe', () => {
    let pipe;

    beforeEach(() => {
        //We will use the CapitalizePipe in our TestBed so we configure accordingly
        TestBed.configureTestingModule({
            providers: [CapitalisePipe]
        });
    });

    beforeEach(async(() => {
        //Before we can test we have to compile to make it available
        TestBed.compileComponents();
    }));


    beforeEach(inject([CapitalisePipe], p => {
        //we inject a pipe before we run our test cases
        pipe = p;
    }));

    it('should throw if not used with a string', () => {
        //must use arrow function for expect to capture exception
        expect(()=>pipe.transform(null)).toThrow();
        expect(()=>pipe.transform(undefined)).toThrow();
        expect(()=>pipe.transform()).toThrow();
        expect(()=>pipe.transform()).toThrowError('Requires a String as input');
    });

    it('should work with empty string', () => {
        expect(pipe.transform('')).toEqual('');
    });

    it('should capitalise', () => {
        expect(pipe.transform('wow')).toEqual('WOW');
    });
});