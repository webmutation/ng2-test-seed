import {Observable} from 'rxjs/Rx';

describe('universal truths', () => {
  it('should do math', () => {
    expect(1 + 1).toEqual(2);

    expect(5).toBeGreaterThan(4);
  });

  xit('should skip this', () => {
    expect(4).toEqual(40);
  });
});


describe('Observable: basic observable', () => {
  let basicObservable;

  //setup
  beforeEach(() => {
    basicObservable = new Observable(observer => {
      //pushing values
      observer.next(1);
      observer.next(2);
      observer.next(3);
      //complete stream
      observer.complete();
    });
  })

  //specs
  it('should create the expected sequence', done => {
    let expected = [1,2,3],
        index = 0;
    basicObservable
        .subscribe(
            x => {                  // next
              expect(x).toEqual(expected[index++]);
            },
            x => x.results.push('#'), // error
            x => done()             // complete
        );
  })
});