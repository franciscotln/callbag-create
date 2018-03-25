const create = prod => (start, sink) => {
  if (start !== 0) return;
  let got2 = false;
  let disposed = false;
  function checkGot2(t) {
    got2 = got2 || t === 2;
  }
  sink(start, checkGot2);
  if (typeof prod !== 'function') return;
  prod((t, d) => {
    if (t === 0) return;
    checkGot2(t);
    !got2 && sink(t, d);
    if (got2 && !disposed) {
      disposed = true;
      sink(2);
    }
  });
};

module.exports = create;