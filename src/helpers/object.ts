export function hasOwn(ctx, propName) {
  return Object.prototype.hasOwnProperty.call(ctx, propName);
}
