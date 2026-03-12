import { CircleAlert, CircleCheck } from 'lucide-react';

import { toast } from '@confeti/design-system';

import * as styles from './admin-toast.css';

interface AdminToastOptions {
  text: string;
}

export const adminToast = {
  success: ({ text }: AdminToastOptions) =>
    toast({
      text,
      position: 'bottomRight',
      color: 'black',
      autoClose: 4000,
      className: `${styles.adminToastBase} ${styles.successAccent}`,
      icon: <CircleCheck size={20} color="#34D399" />,
    }),

  error: ({ text }: AdminToastOptions) =>
    toast({
      text,
      position: 'bottomRight',
      color: 'black',
      autoClose: 5000,
      className: `${styles.adminToastBase} ${styles.errorAccent}`,
      icon: <CircleAlert size={20} color="#F87171" />,
    }),
};
