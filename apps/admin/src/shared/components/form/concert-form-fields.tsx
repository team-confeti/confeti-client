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
import { concertSchema } from '@shared/schemas/concert-schema';

import * as styles from './concert-form-fields.css';

interface Props {
  register: UseFormRegister<z.infer<typeof concertSchema>>;
  errors: FieldErrors<z.infer<typeof concertSchema>>;
  control: Control<z.infer<typeof concertSchema>>;
}

export const ConcertBasicFormField = ({ register, errors, control }: Props) => {
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
          placeholder="콘서트 제목을 입력해주세요"
          error={errors.title?.message}
        />
        <FormInput
          {...register('subTitle')}
          type="text"
          label="콘서트 부제목"
          placeholder="콘서트 부제목을 입력해주세요"
          error={errors.subTitle?.message}
        />
      </div>

      <div className={styles.inputContainer}>
        <FormInput
          {...register('startDate')}
          type="date"
          label="콘서트 시작일"
          error={errors.startDate?.message}
        />
        <FormInput
          {...register('endDate')}
          type="date"
          label="콘서트 종료일"
          error={errors.endDate?.message}
        />
      </div>

      <div className={styles.inputContainer}>
        <FormInput
          {...register('location')}
          type="text"
          label="콘서트 장소"
          placeholder="ex) 올림픽공원 SK 핸드볼경기장"
          error={errors.location?.message}
        />
        <FormInput
          {...register('reservationDate')}
          type="date"
          label="예매 시작일"
          error={errors.reservationDate?.message}
        />
      </div>

      <div className={styles.inputContainer}>
        <FormInput
          {...register('ageLimit')}
          type="text"
          label="연령 제한"
          placeholder="ex) 만 18세 이상"
          error={errors.ageLimit?.message}
        />
        <FormInput
          {...register('concertTime')}
          type="time"
          label="공연 시간"
          error={errors.concertTime?.message}
        />
      </div>

      <div className={styles.inputContainer}>
        <FormInput
          {...register('concertPrice')}
          type="text"
          label="티켓 가격"
          placeholder="ex) VIP 150,000원 / R석 120,000원"
          error={errors.concertPrice?.message}
        />
        <FormInput
          {...register('concertAddress')}
          type="text"
          label="상세 주소"
          placeholder="서울시 송파구 올림픽로 424"
          error={errors.concertAddress?.message}
        />
      </div>

      <div className={styles.singleInputContainer}>
        <Controller
          control={control}
          name="posterImage"
          render={({ field }) => (
            <>
              <FormInput
                type="file"
                label="포스터 이미지"
                accept="image/*"
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
    </div>
  );
};

export const ConcertReservationFormField = ({
  register,
  errors,
  control,
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reservationLinks',
  });

  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>예매 링크</h2>

      {fields.map((field, index) => (
        <div key={field.id} className={styles.fieldGroup}>
          <div className={styles.fieldGroupHeader}>
            <div className={styles.fieldGroupTitle}>
              예매 사이트 정보
              <span> {index + 1}</span>
            </div>
            <button
              className={styles.deleteButton}
              type="button"
              onClick={() => remove(index)}
              aria-label={`${index + 1}번째 예매 링크 삭제`}
            >
              삭제
            </button>
          </div>

          <div className={styles.inputContainer}>
            <FormInput
              {...register(`reservationLinks.${index}.reservationUrl`)}
              type="url"
              label="예매 URL"
              placeholder="https://ticket.example.com"
              error={errors.reservationLinks?.[index]?.reservationUrl?.message}
            />
            <FormInput
              {...register(`reservationLinks.${index}.reservationSiteName`)}
              type="text"
              label="예매 사이트명"
              placeholder="ex) 인터파크 티켓"
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
                accept="image/*"
                placeholder="로고 이미지를 선택해주세요"
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
        </div>
      ))}

      <div className={styles.buttonContainer}>
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
          + 예매 링크 추가
        </button>
      </div>
    </div>
  );
};

export const ConcertArtistFormField = ({
  register,
  errors,
  control,
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'artistIds',
  });

  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>출연 아티스트</h2>

      {fields.map((field, index) => (
        <div key={field.id} className={styles.fieldGroup}>
          <div className={styles.fieldGroupHeader}>
            <div className={styles.fieldGroupTitle}>
              아티스트 정보
              <span> {index + 1}</span>
            </div>
            <button
              className={styles.deleteButton}
              type="button"
              onClick={() => remove(index)}
              aria-label={`${index + 1}번째 아티스트 삭제`}
            >
              삭제
            </button>
          </div>

          <FormInput
            {...register(`artistIds.${index}.value`)}
            type="text"
            label="아티스트 ID"
            placeholder="아티스트 고유 ID를 입력해주세요"
            error={errors.artistIds?.[index]?.value?.message}
          />
        </div>
      ))}

      <div className={styles.buttonContainer}>
        <button
          type="button"
          onClick={() => append({ value: '' })}
          className={styles.addButton}
        >
          + 아티스트 추가
        </button>
      </div>
    </div>
  );
};
