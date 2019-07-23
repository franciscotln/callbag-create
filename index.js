const create = prod => (start, sink) => {
  if (start !== 0) return;
  if (typeof prod !== 'function') {
    sink(0, () => {});
    sink(2);
    return;
  }
  let end = false;
  let clean;
  sink(0, (t) => {
    if (!end) {
      end = t === 2;
      if (end && typeof clean === 'function') clean();
    }
  });
  if (end) return;
  clean = prod((v) => {
    if (!end) sink(1, v);
  }, (e) => {
    if (!end && e !== undefined) {
      end = true;
      sink(2, e);
    }
  }, () => {
    if (!end) {
      end = true;
      sink(2);
    }
  });
};

export default create;
