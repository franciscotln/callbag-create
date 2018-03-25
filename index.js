const create = prod => (start, sink) => {
  let got2 = false;
  let disposed = false;
  function checkGot2(t) {
    got2 = got2 || t === 2;
  }
  start === 0 && sink(start, checkGot2);
  prod && prod((t, d) => {
    checkGot2(t);
    !got2 && sink(t, d);
    if (got2 && !disposed) {
      disposed = true;
      sink(2);
    }
  });
};

module.exports = create;