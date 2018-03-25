const create = prod => (start, sink) => {
  let done = false;
  function checkDone(t) {
    done = done || t === 2;
  }
  start === 0 && sink(start, checkDone);
  prod && prod((t, d) => {
    checkDone(t);
    !done && sink(t, d);
  });
};

module.exports = create;