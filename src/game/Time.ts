const onTickFunctions = new Map<string, Function>();

export function init() {
  setInterval(tick, 250);
}

export function addOnTickFunction(key: string, func: Function) {
  onTickFunctions.set(key, func);
}

export function removeOnTickFunction(key: string) {
  onTickFunctions.delete(key);
}

export function tick() {
  onTickFunctions.forEach((func) => {
    func();
  });
}
