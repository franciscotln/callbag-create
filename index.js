const create = prod => (start, sink) => {
  if (start !== 0) return;
  if (typeof prod !== 'function') {
    sink(0, () => {});
    return;
  }
  let started = disposed = got1 = got2 = false;
  sink(0, t => {
    got1 = got1 || t === 1;
    got2 = got2 || t === 2;
    !started && got1 && prod((pt, pd) => {
      if (pt === 0) return;
      started = true;
      !disposed && got1 && pt === 1 && sink(pt, pd);
      if ((got2 || pt === 2) && !disposed) {
        disposed = true;
        sink(2);
      }
    });
  });
};

module.exports = create;