export type ToastPosition =
  | 'bottomCenter'
  | 'bottomLeft'
  | 'bottomRight'
  | 'middleCenter'
  | 'topCenter'
  | 'topLeft'
  | 'topRight';

export type ToastProps = {
  toastId: string;
  text: string;
  autoClose?: false | number;
  closeOnClick?: boolean;
  position?: ToastPosition;
  icon?: JSX.Element | 'default';
  className?: string;
  highlightText?: string;
};

export const enum ToastEvent {
  Add,
  Delete,
  Update,
}

export type EventCallbacks = {
  [ToastEvent.Add]: (props: ToastProps) => void;
  [ToastEvent.Delete]: (id: string) => void;
  [ToastEvent.Update]: (id: string, text: string) => void;
};

export type TimeoutId = ReturnType<typeof setTimeout>;

export interface EventManager {
  list: Map<ToastEvent, EventCallbacks[keyof EventCallbacks][]>;
  emitQueue: Map<ToastEvent, TimeoutId[]>;

  on<E extends ToastEvent>(event: E, callback: EventCallbacks[E]): EventManager;
  off<E extends ToastEvent>(
    event: E,
    callback?: EventCallbacks[E],
  ): EventManager;
  cancelEmit(event: ToastEvent): EventManager;
  emit<E extends ToastEvent>(
    event: E,
    ...args: Parameters<EventCallbacks[E]>
  ): void;
}
