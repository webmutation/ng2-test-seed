import {async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import {UserService} from '../app/user-service';
import {LoginService} from '../app/login-service';
import {GreetingComponent} from '../app/greeting-component';

class MockLoginService extends LoginService {
    login(pin: number) {
        return Promise.resolve(true);
    }
}

describe('greeting component', () => {
    beforeEach(() => {
        //Lets Import our GreetingComponent and the Services that it uses, in this case we will mock the LoginService using useClass: MockLoginService
        TestBed.configureTestingModule({
            declarations: [GreetingComponent],
            providers: [{provide: LoginService, useClass: MockLoginService}, UserService]
        });
    });

    describe('without overriding', () => {
        //We compile the component so that it is available for testing
        beforeEach(async(() => {
            TestBed.compileComponents();
        }));

        it('should ask for PIN', async(() => {
            //We instantiate our component
            let fixture = TestBed.createComponent(GreetingComponent);

            //trigger the change detector
            fixture.detectChanges();

            //and we now have a reference to the element like it would be rendered
            let compiled = fixture.debugElement.nativeElement;

            //We expect the element to have the words Enter Pin by using a custom toContainText matcher. (This is our own custom matcher)
            //I.E. we are essentially expecting that the gretting propriety of the component was instantiated correctly with "greeting: string = 'Enter PIN';"
            expect(compiled).toContainText('Enter PIN');

            //We can then verify that the DOM is being properly rendered in our greeting-component template
            //we have a line <h3>Status: {{greeting}}</h3>, we can now validate that the h3 element was properly rendered.
            expect(compiled.querySelector('h3')).toHaveText('Status: Enter PIN');
        }));

        it('should change the greeting', async(() => {
            let fixture = TestBed.createComponent(GreetingComponent);
            fixture.detectChanges();

            //we have a test element ready to be altered, let set the greeting propriety to "Foobar"
            //we can now get the instance and change the value of the propriety
            fixture.debugElement.componentInstance.greeting = 'Foobar';

            //for the change to be effective we have to trigger the change detector
            fixture.detectChanges();

            //we now want to see if the changes are effective on the rendered template and for that we can use nativeElement
            let compiled = fixture.debugElement.nativeElement;

            //We now have tested that the greeting is effectively changed.
            expect(compiled.querySelector('h3')).toHaveText('Status: Foobar');
        }));

        it('should accept pin', async(() => {
            let fixture = TestBed.createComponent(GreetingComponent);
            fixture.detectChanges();
            let compiled = fixture.debugElement.nativeElement;

            //we can also run events on elements, in this case we are triggering the click event
            compiled.querySelector('button').click();

            //we wait until the event finish by using componentInstance.pending (AsyncAction)
            fixture.debugElement.componentInstance.pending.then(() => {
                fixture.detectChanges();
                expect(compiled.querySelector('h3')).toHaveText('Status: Welcome!');
            });
        }));

        it('should accept pin (with whenStable)', async(() => {
            let fixture = TestBed.createComponent(GreetingComponent);
            fixture.detectChanges();
            let compiled = fixture.debugElement.nativeElement;
            compiled.querySelector('button').click();

            //The same setup, the only change is that we now call whenStable, that waits until all async events are resolved
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(compiled.querySelector('h3')).toHaveText('Status: Welcome!');
            });
        }));

        //we can create a fakeAsync zone that we manually control using tick
        it('should accept pin (with fakeAsync)', fakeAsync(() => {
            let fixture = TestBed.createComponent(GreetingComponent);

            let compiled = fixture.debugElement.nativeElement;
            compiled.querySelector('button').click();

            //Here we call tick to signal passage of time
            tick();
            fixture.detectChanges();
            expect(compiled.querySelector('h3')).toHaveText('Status: Welcome!');
        }));
    });

    //we can also override our components by setting properties
    describe('overriding', () => {
        it('should override the template', async(() => {
            //here we override the component template to present Foo {{greeting}} instead of the component template
            TestBed.overrideComponent(GreetingComponent, {
                set: {
                    template: `<span>Foo {{greeting}}<span>`
                }
                //Here we recompile the component with our changes and the rest is similar.
            }).compileComponents().then(() => {
                let fixture = TestBed.createComponent(GreetingComponent);
                fixture.detectChanges();

                let compiled = fixture.debugElement.nativeElement;
                //we expect our component to have the text Foo since this is our new template and because
                //greeting: string = 'Enter PIN'; our greeting is Enter Pin.
                expect(compiled).toHaveText('Foo Enter PIN');
            });
        }));
    });
});
