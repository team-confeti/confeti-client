import { clsx } from 'clsx/lite';

export function cn(...inputs: Array<string | undefined>) {
  return clsx(...inputs);
}
