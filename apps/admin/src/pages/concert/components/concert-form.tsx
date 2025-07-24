import type { z } from 'zod';

import {
  ConcertArtistFormField,
  ConcertBasicFormField,
  ConcertReservationFormField,
} from '@shared/components/form/concert-form-fields';
import { useZodForm } from '@shared/hooks/use-zod-form';
import {
  concertDefaultValues,
  concertSchema,
} from '@shared/schemas/concert-schema';

import * as styles from './concert-form.css';

const ConcertForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useZodForm({
    schema: concertSchema,
    defaultValues: concertDefaultValues,
  });

  // TODO: 저장 로직 추가
  const onSubmit = (data: z.infer<typeof concertSchema>) => {
    console.log('Form Data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      <ConcertBasicFormField
        register={register}
        errors={errors}
        control={control}
      />
      <ConcertReservationFormField
        register={register}
        errors={errors}
        control={control}
      />
      <ConcertArtistFormField
        register={register}
        errors={errors}
        control={control}
      />
      <button type="submit" className={styles.submitButton}>
        저장하기
      </button>
    </form>
  );
};

export default ConcertForm;
