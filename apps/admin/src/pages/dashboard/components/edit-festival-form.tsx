import { useState } from 'react';
import { z } from 'zod';

import {
  FestivalBasicFormField,
  FestivalDateFormField,
  FestivalReservationFormField,
  FestivalStageFormField,
} from '@shared/components/form/festival-form-fields';
import { FESTIVAL_TAB } from '@shared/constants/tab';
import { useImagePreview } from '@shared/hooks/use-image-preview';
import { useZodForm } from '@shared/hooks/use-zod-form';
import {
  festivalDefaultValues,
  festivalSchema,
} from '@shared/schemas/festival-schema';

import * as styles from './edit-festival-form.css';

interface Props {
  id: string;
}

const EditFestivalForm = ({ id }: Props) => {
  const [tab, setTab] = useState<FESTIVAL_TAB>(FESTIVAL_TAB.BASIC);
  const { preview: posterPreview, handleFileChange: handlePosterChange } =
    useImagePreview();
  const { preview: logoPreview, handleFileChange: handleLogoChange } =
    useImagePreview();

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
          className={tab === FESTIVAL_TAB.BASIC ? styles.activeTab : styles.tab}
          onClick={() => setTab(FESTIVAL_TAB.BASIC)}
        >
          기본 정보
        </button>
        <button
          type="button"
          className={tab === FESTIVAL_TAB.DATE ? styles.activeTab : styles.tab}
          onClick={() => setTab(FESTIVAL_TAB.DATE)}
        >
          페스티벌 날짜
        </button>
      </div>

      {tab === FESTIVAL_TAB.BASIC && (
        <>
          <FestivalBasicFormField
            register={register}
            errors={errors}
            control={control}
            posterPreview={posterPreview}
            logoPreview={logoPreview}
            onPosterChange={handlePosterChange}
            onLogoChange={handleLogoChange}
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

      {tab === FESTIVAL_TAB.DATE && (
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
