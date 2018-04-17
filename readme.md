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
  create((sink) => {
    sink(1, 'a');
    sink(1, 'b');
    sink(2);
    sink(1, 'c');
  }),
  forEach((v) => {
    console.log(v); // 'a'
  })                // 'b'
);
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