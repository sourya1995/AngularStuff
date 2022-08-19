const { Observable } = rxjs;

const observable = new Observable(observer => {
    observer.next('Hello!');
    observer.complete(); //no more data logged, flow stops here
    observer.error(new Error('An error has occurred'));
});

//observer is the object that interacts with the observable

observable.subscribe({
    next(value) {
        console.log('Observable sent a value', value);
    },
    complete() {
        console.log('Complete');
    },
    error(err){
        console.log(err.message)
    }
});

/* alternatively,

observable.subscribe(
    (value) => console.log('Observable sent a value', value),
    (err) => console.log(err.message),
    () => console.log('Complete')
);

*/