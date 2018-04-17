const create = prod => (start, sink) => {
  if (start !== 0) return;
  if (typeof prod !== 'function') {
    sink(0, () => {});
    sink(2);
    return;
  }
  let end;
  let got2;
  let unsub;
  sink(0, t => {
    got2 = got2 || t === 2;
  });
  unsub = prod((t, d) => {
    if (end || t === 0) return;
    if (!got2) {
      sink(t, d);
      got2 = got2 || t === 2;
    } else if (!end) {
      end = true;
      if (unsub) unsub();
    }
  });
};

module.exports = create;
