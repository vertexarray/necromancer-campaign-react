const onTickFunctions = new Map<string, Function>();
const accumulators = new Map<string, number>();
const intervals = new Map<string, number>();

export function init() {
  setInterval(tick, 250);
}

export function addOnTickFunction(key: string, func: Function, interval = 0) {
  onTickFunctions.set(key, func);
  accumulators.set(key, interval);
  intervals.set(key, interval);
}

export function removeOnTickFunction(key: string) {
  onTickFunctions.delete(key);
}

export function tick() {
  onTickFunctions.forEach((func, key) => {
    if (accumulators.get(key)! >= intervals.get(key)!) {
      func();
      accumulators.set(key, 0);
    } else {
      accumulators.set(key, accumulators.get(key)! + 1);
    }
  });
}
