import { useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import type { z } from 'zod';

import FormInput from '@shared/components/form/form-input';
import { useImagePreview } from '@shared/hooks/use-image-preview';
import { useZodForm } from '@shared/hooks/use-zod-form';

import { concertSchema } from '../schemas/concert-schema';

import * as styles from './concert-form.css';

interface Props {
  register: UseFormRegister<z.infer<typeof concertSchema>>;
  errors: FieldErrors<z.infer<typeof concertSchema>>;
  control: Control<z.infer<typeof concertSchema>>;
}

function ConcertBasicFormField({ register, errors, control }: Props) {
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const posterPreview = useImagePreview(posterFile);

  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>기본 정보</h2>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('title')}
          type="text"
          label="콘서트 제목"
          placeholder="콘서트 제목을 입력해주세요."
          error={errors.title?.message}
        />
        <FormInput
          {...register('subTitle')}
          type="text"
          label="콘서트 부제목"
          placeholder="콘서트 부제목을 입력해주세요."
          error={errors.subTitle?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('startDate')}
          type="date"
          label="콘서트 시작일"
          placeholder="콘서트 시작일을 입력해주세요."
          error={errors.startDate?.message}
        />
        <FormInput
          {...register('endDate')}
          type="date"
          label="콘서트 종료일"
          placeholder="콘서트 종료일을 입력해주세요."
          error={errors.endDate?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('location')}
          type="text"
          label="콘서트 장소"
          placeholder="콘서트 장소를 입력해주세요."
          error={errors.location?.message}
        />
        <FormInput
          {...register('reservationDate')}
          type="date"
          label="예매 날짜"
          placeholder="예매 날짜를 입력해주세요."
          error={errors.reservationDate?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('ageLimit')}
          type="text"
          label="연령 제한"
          placeholder="연령 제한을 입력해주세요."
          error={errors.ageLimit?.message}
        />
        <FormInput
          {...register('concertTime')}
          type="text"
          label="콘서트 시간"
          placeholder="콘서트 시간을 입력해주세요."
          error={errors.concertTime?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('concertPrice')}
          type="text"
          label="콘서트 가격"
          placeholder="콘서트 가격을 입력해주세요."
          error={errors.concertPrice?.message}
        />
        <FormInput
          {...register('concertAddress')}
          type="text"
          label="콘서트 주소"
          placeholder="콘서트 주소를 입력해주세요."
          error={errors.concertAddress?.message}
        />
      </div>
      <Controller
        control={control}
        name="posterImage"
        render={({ field }) => (
          <>
            <FormInput
              type="file"
              label="포스터 이미지"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setPosterFile(file);
                field.onChange(file);
              }}
              error={errors.posterImage?.message}
            />
            {posterPreview && (
              <div className={styles.posterPreviewContainer}>
                <img
                  src={posterPreview}
                  alt="포스터 미리보기"
                  className={styles.posterPreview}
                />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
}

function ConcertReservationFormField({ register, errors, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reservationLinks',
  });

  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>예매 링크</h2>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.fieldSection}>
          <div className={styles.inputContainer}>
            <FormInput
              {...register(`reservationLinks.${index}.reservationUrl`)}
              type="text"
              label="예매 URL"
              placeholder="예매 URL을 입력해주세요."
              error={errors.reservationLinks?.[index]?.reservationUrl?.message}
            />
            <FormInput
              {...register(`reservationLinks.${index}.reservationSiteName`)}
              type="text"
              label="예매 사이트명"
              placeholder="예매 사이트명을 입력해주세요."
              error={
                errors.reservationLinks?.[index]?.reservationSiteName?.message
              }
            />
          </div>

          <Controller
            control={control}
            name={`reservationLinks.${index}.reservationSiteLogo`}
            render={({ field }) => (
              <FormInput
                type="file"
                label="사이트 로고"
                placeholder="사이트 로고를 입력해주세요."
                error={
                  errors.reservationLinks?.[index]?.reservationSiteLogo?.message
                }
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />
            )}
          />
          <button
            className={styles.deleteButton}
            type="button"
            onClick={() => remove(index)}
          >
            삭제
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          append({
            reservationUrl: '',
            reservationSiteName: '',
            reservationSiteLogo: new File([], ''),
          })
        }
        className={styles.addButton}
      >
        예매 링크 추가
      </button>
    </div>
  );
}

function ConcertArtistFormField({ register, errors, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'artistIds',
  });

  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>아티스트</h2>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.fieldSection}>
          <FormInput
            {...register(`artistIds.${index}.value`)}
            type="text"
            label={`아티스트 ID ${index + 1}`}
            placeholder="아티스트 ID를 입력해주세요."
            error={errors.artistIds?.[index]?.value?.message}
          />
          <button
            className={styles.deleteButton}
            type="button"
            onClick={() => remove(index)}
          >
            삭제
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ value: '' })}
        className={styles.addButton}
      >
        아티스트 추가
      </button>
    </div>
  );
}

const ConcertForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useZodForm({
    schema: concertSchema,
    defaultValues: {
      title: '',
      subTitle: '',
      startDate: '',
      endDate: '',
      location: '',
      reservationDate: '',
      ageLimit: '',
      concertTime: '',
      concertPrice: '',
      concertAddress: '',
      posterImage: new File([], ''),
      reservationLinks: [
        {
          reservationUrl: '',
          reservationSiteName: '',
          reservationSiteLogo: new File([], ''),
        },
      ],
      artistIds: [{ value: '' }],
    },
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
      <button type="submit" disabled={!isValid} className={styles.submitButton}>
        저장하기
      </button>
    </form>
  );
};

export default ConcertForm;
