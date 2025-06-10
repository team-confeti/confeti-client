import { type DefaultValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

export const useZodForm = <T extends z.ZodTypeAny>({
  schema,
  defaultValues,
  mode = 'onChange',
}: {
  schema: T;
  defaultValues: DefaultValues<z.infer<T>>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit';
}) => {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode,
  });
};
