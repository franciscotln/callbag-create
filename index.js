const create = prod => (start, sink) => {
  if (start !== 0) return;
  if (typeof prod !== 'function') {
    sink(0, () => {});
    sink(2);
    return;
  }
  let end;
  let unsub;
  const maybeDispose = t => {
    end = end || t === 2;
    if (end && typeof unsub === 'function') unsub();
  };
  sink(0, maybeDispose);
  unsub = prod((t, d) => {
    if (end || t === 0) return;
    sink(t, d);
    maybeDispose(t);
  });
};

module.exports = create;
