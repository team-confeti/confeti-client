import { color } from './color';
import { display } from './display';

export const overlay = {
  default: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: color.black_op,
    ...display.flexJustifyAlignCenter,
    borderRadius: '1rem',
  },
} as const;
