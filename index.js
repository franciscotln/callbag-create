const create = prod => (start, sink) => {
  if (start !== 0) return;
  if (typeof prod !== 'function') {
    sink(0, () => {});
    return;
  }
  let started = disposed = false;
  let unsub
  sink(0, (t, d) => {
    if (!started && t === 1) {
      unsub = prod((pt, pd) => {
        if (pt === 0) return;
        started = true;
        !disposed && pt === 1 && sink(pt, pd);
        if (pt === 2 && !disposed) {
          disposed = true;
          sink(2);
        }
      });
    }
    t === 2 && unsub && unsub(d);
  });
};

module.exports = create;
