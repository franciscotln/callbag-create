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
    sink(3, 'c');
  }),
  forEach((v) => {
    console.log(v); // 'a'
  })                // 'b'
);
```

### Without a Producer

```js
const create = require('callbag-create');
const forEach = require('callbag-for-each');
const pipe = require('callbag-pipe');

pipe(
  create(),
  forEach((x) => {
    console.log(x); // void
  })
);
```