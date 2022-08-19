const { fromEvent } = rxjs;
const { map, pluck } = rxjs.operators;

const input = document.querySelector('input');

const observable = fromEvent(input, 'input')
    .pipe(
        //map(event => event.target.value),
        pluck('target', 'value'),
        map(value => parseInt(value)), //string to Integer
        map(value => {
            if(isNaN(value)){
                throw new Error('Not a number!');
            }

            return value;
        })
    );

observable.subscribe({
    next(value) {
        console.log(value);
    },
    error(err){
        console.log(err.message);
    }
})