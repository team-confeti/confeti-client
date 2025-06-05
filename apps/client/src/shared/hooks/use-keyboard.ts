interface KeyboardEvents {
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
