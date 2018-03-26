const test = require('tape');
const create = require('./index');

test('it creates a new callbag without a producer and never emits values', (t) => {
  t.plan(3);

  const downwardsExpectedType = [
    [0, 'function']
  ];

  const downwardsExpected = [];

  function makeSink() {
    let talkback;
    return (type, data) => {
      const et = downwardsExpectedType.shift();
      t.equals(type, et[0], 'downwards type is expected: ' + et[0]);
      t.equals(typeof data, et[1], 'downwards data type is expected: ' + et[1]);
      if (type === 0) {
        talkback = data;
      }
      if (downwardsExpected.length === 0) {
        talkback(2);
      }
    };
  }

  create()(0, makeSink());

  t.pass('Nothing else happens after dispose()');
  t.end();
});

test('it creates a new callbag with a producer that controls the values emitions and completion', (t) => {
  t.plan(11);

  const downwardsExpectedType = [
    [0, 'function'],
    [1, 'string'],
    [1, 'string'],
    [2, 'undefined']
  ];

  const downwardsExpected = ['a', 'b'];

  const source = create((sink) => {
    sink(1, 'a');
    sink(1, 'b');
    sink(2);
    sink(2);
    sink(1, 'c');
    sink(1, 'd');
  });

  let talkback;
  source(0, (type, data) => {
    if (type === 0) {
      talkback = data;
    }
    const et = downwardsExpectedType.shift();
    t.equals(type, et[0], 'downwards type is expected: ' + et[0]);
    t.equals(typeof data, et[1], 'downwards data type is expected: ' + et[1]);
    if (type === 1) {
      const e = downwardsExpected.shift();
      t.deepEquals(data, e, 'downwards data is expected: ' + e);
    }
    if (type === 0 || type === 1) talkback(1);
  });

  t.pass('Nothing else happens after the producer completes for the first time');
  t.end();
});

test('it creates a new callbag with a producer that emits nothing upon upwards 2', (t) => {
  t.plan(3);

  const downwardsExpectedType = [
    [0, 'function']
  ];

  const source = create((sink) => {
    sink(1, 'a');
    sink(1, 'b');
  });

  source(0, (type, data) => {
    const et = downwardsExpectedType.shift();
    t.equals(type, et[0], 'downwards type is expected: ' + et[0]);
    t.equals(typeof data, et[1], 'downwards data type is expected: ' + et[1]);
    type === 0 && data(2);
  });

  t.pass('Nothing else happens after the sink sends 2 upwards');
  t.end();
});