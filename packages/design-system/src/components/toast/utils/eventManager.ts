import { EventManager } from '../types/type';

export const eventManager: EventManager = {
  list: new Map(),
  emitQueue: new Map(),

  on(event, callback) {
    this.list.has(event)
      ? this.list.get(event)!.push(callback)
      : this.list.set(event, [callback]);

    return this;
  },

  off(event, callback) {
    if (callback) {
      const cb = this.list.get(event)?.filter((cb) => cb !== callback);
      cb && this.list.set(event, cb);
      return this;
    }
    this.list.delete(event);

    return this;
  },

  cancelEmit(event) {
    const timers = this.emitQueue.get(event);
    if (timers) {
      timers.forEach(clearTimeout);
      this.emitQueue.delete(event);
    }

    return this;
  },

  emit(event, ...args: never[]) {
    this.list.has(event) &&
      this.list.get(event)!.forEach((callback) => {
        const timer = setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          return callback(...args);
        }, 0);

        this.emitQueue.has(event)
          ? this.emitQueue.get(event)!.push(timer)
          : this.emitQueue.set(event, [timer]);
      });
  },
};
