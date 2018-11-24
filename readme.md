# callbag-create

Creates a new Callbag given an optional producer that dictates how to emit values and complete the Callbag.

`npm install callbag-create`

## Examples

### With a Producer

```js
const create = require('callbag-create');
const forEach = require('callbag-for-each');
const pipe = require('callbag-pipe');

pipe(
  create((next, error, done) => {
    next('a');
    next('b');
    done();
    next('c');
  }),
  forEach((v) => {
    console.log(v);
  })
);
// logs 'a', 'b', then completes.
// Calling next('c') does nothing since done() was called and terminated the callbag
```

### With a Producer returning a clean-up logic

```js
const create = require('callbag-create');
const forEach = require('callbag-for-each');
const pipe = require('callbag-pipe');

const unsubscribe = pipe(
  create((next, error, done) => {
    const id = setTimeout(() => {
      next('a');
      done();
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }),
  subscribe({
    next(v) {
      console.log(v);
    },
    complete() {
      console.log('Done()');
    }
  })
);

unsubscribe();
// logs nothing since it was unsubscribed before emitting and the timeout is cleared
```

### With a Noop Producer
Equivalent to xstream and RxJs never().
Never emits the completion message.

```js
const create = require('callbag-create');
const forEach = require('callbag-for-each');
const pipe = require('callbag-pipe');

pipe(
  create(() => {}),
  forEach((v) => {
    console.log(v); // void
  })
);
```

### Without a Producer
Equivalent to xstream and RxJs empty().
Emits no value and immediatelly emits the completion message.

```js
const create = require('callbag-create');
const subscribe = require('callbag-subscribe');
const pipe = require('callbag-pipe');

pipe(
  create(),
  subscribe({
    next(v) {
      console.log(v);
    },
    complete() {
      console.log('Done()');
    }
  }) // => Done()
);
```