const { Observable } = rxjs;
const { tap } = rxjs.operators;

const observable = new Observable(observer => {
    observer.next('Hello');
    observer.complete();
}).pipe(
    tap(value => console.log('Tap function is running', value)) //catch value emitted from observable
);

observable.subscribe(
    (value) => console.log('1st Observer: ', value),
    (err) => console.log(err.message),
    () => console.log('1st complete')
)

observable.subscribe(
    (value) => console.log('2nd Observer: ', value),
)