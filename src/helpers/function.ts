export function bind(ctx, methodName) {
  if (typeof ctx[methodName] === 'function') {
    ctx[methodName] = ctx[methodName].bind(ctx);
  }
}

export function bindAll(ctx, ...methodNames) {
  methodNames.forEach(key => {
    if (key !== 'constructor') {
      bind(ctx, key);
    }
  });
}
