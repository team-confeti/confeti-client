import {
  EventManager,
  ToastEvent,
  EventCallbacks,
  TimeoutId,
  ToastProps,
} from '../types';

export const eventManager: EventManager = {
  list: new Map(),
  emitQueue: new Map(),

  on<E extends ToastEvent>(event: E, callback: EventCallbacks[E]) {
    if (!this.list.has(event)) {
      this.list.set(event, []);
    }
    this.list
      .get(event)!
      .push(callback as EventCallbacks[keyof EventCallbacks]);
    return this;
  },

  off<E extends ToastEvent>(event: E, callback?: EventCallbacks[E]) {
    if (callback && this.list.has(event)) {
      const callbacks = this.list.get(event)!;
      const filteredCallbacks = callbacks.filter((cb) => cb !== callback);
      this.list.set(event, filteredCallbacks);
    } else if (!callback) {
      this.list.delete(event);
    }
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

  emit<E extends ToastEvent>(event: E, ...args: Parameters<EventCallbacks[E]>) {
    if (!this.list.has(event)) return;

    const callbacks = this.list.get(event)!;
    const timers: TimeoutId[] = [];

    callbacks.forEach((callback) => {
      const timer = setTimeout(() => {
        switch (event) {
          case ToastEvent.Add:
            (callback as EventCallbacks[ToastEvent.Add])(
              ...(args as [ToastProps]),
            );
            break;
          case ToastEvent.Delete:
            (callback as EventCallbacks[ToastEvent.Delete])(
              ...(args as [string]),
            );
            break;
          case ToastEvent.Update:
            (callback as EventCallbacks[ToastEvent.Update])(
              ...(args as [string, string]),
            );
            break;
        }
      }, 0);
      timers.push(timer);
    });

    if (timers.length > 0) {
      this.emitQueue.set(event, [
        ...(this.emitQueue.get(event) || []),
        ...timers,
      ]);
    }
  },
};
