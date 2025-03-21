import {
  EventCallbacks,
  EventManager,
  TimeoutId,
  ToastEvent,
  ToastProps,
} from '../types';
import { TOAST_MAX_COUNT } from './constants';

export const eventManager: EventManager = {
  list: new Map(),
  emitQueue: new Map(),
  activeToastCount: 0,

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

  emit<E extends ToastEvent>(event: E, ...args: Parameters<EventCallbacks[E]>) {
    if (!this.list.has(event)) return;

    const callbacks = this.list.get(event)!;
    const timers: TimeoutId[] = [];

    if (event === ToastEvent.Add && this.activeToastCount >= TOAST_MAX_COUNT) {
      return;
    }

    callbacks.forEach((callback) => {
      const timer = setTimeout(() => {
        switch (event) {
          case ToastEvent.Add:
            (callback as EventCallbacks[ToastEvent.Add])(
              ...(args as [ToastProps]),
            );
            this.activeToastCount += 1;
            break;
          case ToastEvent.Delete:
            (callback as EventCallbacks[ToastEvent.Delete])(
              ...(args as [string]),
            );
            this.activeToastCount -= 1;
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

  cancelEmit(event: ToastEvent) {
    if (this.emitQueue.has(event)) {
      const timers = this.emitQueue.get(event)!;
      timers.forEach(clearTimeout);
      this.emitQueue.delete(event);
    }
    return this;
  },
};
