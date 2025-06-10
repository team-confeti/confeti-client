import { useState } from 'react';
import { z } from 'zod';

import {
  FestivalBasicFormField,
  FestivalDateFormField,
  FestivalReservationFormField,
  FestivalStageFormField,
} from '@shared/components/form/festival-form-fields';
import { useZodForm } from '@shared/hooks/use-zod-form';
import {
  festivalDefaultValues,
  festivalSchema,
} from '@shared/schemas/festival-schema';

import * as styles from './edit-festival-form.css';

type Tab = 'basic' | 'date';

interface Props {
  id: string;
}

const EditFestivalForm = ({ id }: Props) => {
  const [tab, setTab] = useState<Tab>('basic');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useZodForm({
    schema: festivalSchema,
    defaultValues: festivalDefaultValues,
  });

  // TODO: 저장 로직 추가
  const onSubmit = (data: z.infer<typeof festivalSchema>) => {
    console.log(data, id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      <div className={styles.tabWrapper}>
        <button
          type="button"
          className={tab === 'basic' ? styles.activeTab : styles.tab}
          onClick={() => setTab('basic')}
        >
          기본 정보
        </button>
        <button
          type="button"
          className={tab === 'date' ? styles.activeTab : styles.tab}
          onClick={() => setTab('date')}
        >
          페스티벌 날짜
        </button>
      </div>

      {tab === 'basic' && (
        <>
          <FestivalBasicFormField
            register={register}
            errors={errors}
            control={control}
          />
          <FestivalStageFormField
            register={register}
            errors={errors}
            control={control}
          />
          <FestivalReservationFormField
            register={register}
            errors={errors}
            control={control}
          />
        </>
      )}

      {tab === 'date' && (
        <FestivalDateFormField
          register={register}
          errors={errors}
          control={control}
        />
      )}

      <button type="submit" className={styles.submitButton}>
        수정하기
      </button>
    </form>
  );
};

export default EditFestivalForm;
