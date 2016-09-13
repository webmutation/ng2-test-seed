import {async, TestBed} from '@angular/core/testing';
import {logClicks} from "../app/logclicks-directive";
import {Component, Output, EventEmitter} from "@angular/core";

//We will create a container class with a template.
//This will add our host div element that we decorated with log-click to the component
@Component({
    selector: 'container',
    template: `<div log-clicks (changes)="changed($event)"></div>`,
})

export class Container {
    @Output() changes = new EventEmitter();

    changed(value) {
        this.changes.emit(value);
    }
}

describe('Attribute directive: logClicks', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [Container, logClicks]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents();
    }));

    //We have our component compiled
    it('should increment counter', done => {
        //Instantiate the Comtainer and fetch our click element (div)
        let fixture = TestBed.createComponent(Container);
        let container = fixture.componentInstance,
            div = fixture.nativeElement.querySelector('div');
        //set up subscriber to the event
        container.changes.subscribe(x => {
            expect(x).toBe(1);
            done();
        });
        //trigger click on container
        div.click();
    });
});
