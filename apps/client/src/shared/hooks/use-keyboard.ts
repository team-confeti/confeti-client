import { KeyboardEvent } from 'react';

interface KeyboardEvents {
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
}

interface KeyboardProps extends KeyboardEvents {
  isDisabled?: boolean;
}

export function useKeyboard(props: KeyboardProps) {
  return {
    keyboardProps: props.isDisabled
      ? {}
      : {
          onKeyDown: props.onKeyDown,
          onKeyUp: props.onKeyUp,
        },
  };
}
