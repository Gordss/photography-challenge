export function nextTick (cb) {
    Promise.resolve().then(cb);
}