const create = prod => (start, sink) => {
  let started = false;
  let disposed = false;
  start === 0 && sink(start, t => {
    if (typeof prod !== 'function') return;
    !started && t === 1 && prod((pt, pd) => {
      if (pt === start) return;
      started = true;
      !disposed && t === 1 && pt === 1 && sink(pt, pd);
      if (t === 2 || pt === 2 && !disposed) {
        disposed = true;
        sink(2);
      }
    });
  });
};

module.exports = create;