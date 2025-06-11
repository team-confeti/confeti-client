import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

import { FestivalDateField } from '@shared/components/form/festival-date-form-fields';
import FormInput from '@shared/components/form/form-input';
import { festivalSchema } from '@shared/schemas/festival-schema';

import * as styles from './festival-form-fields.css';

interface Props {
  register: UseFormRegister<z.infer<typeof festivalSchema>>;
  errors: FieldErrors<z.infer<typeof festivalSchema>>;
  control: Control<z.infer<typeof festivalSchema>>;
  posterPreview?: string | null;
  logoPreview?: string | null;
  onPosterChange?: (file: File | null) => void;
  onLogoChange?: (file: File | null) => void;
  reservationLogoPreview?: string | null;
  onReservationLogoChange?: (file: File | null) => void;
}

export const FestivalBasicFormField = ({
  register,
  errors,
  control,
  posterPreview,
  logoPreview,
  onPosterChange,
  onLogoChange,
}: Props) => {
  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>기본 정보</h2>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('title')}
          type="text"
          label="페스티벌 제목"
          placeholder="페스티벌 제목을 입력해주세요"
          error={errors.title?.message}
        />
        <FormInput
          {...register('subTitle')}
          type="text"
          label="페스티벌 부제목"
          placeholder="페스티벌 부제목을 입력해주세요"
          error={errors.subTitle?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('startAt')}
          type="date"
          label="페스티벌 시작일"
          error={errors.startAt?.message}
        />
        <FormInput
          {...register('endAt')}
          type="date"
          label="페스티벌 종료일"
          error={errors.endAt?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('area')}
          type="text"
          label="페스티벌 장소"
          placeholder="ex) 올림픽공원 SK 핸드볼경기장"
          error={errors.area?.message}
        />
        <FormInput
          {...register('reserveAt')}
          type="date"
          label="예매 시작일"
          error={errors.reserveAt?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('ageRating')}
          type="text"
          label="연령 제한"
          placeholder="ex) 만 19세 이상"
          error={errors.ageRating?.message}
        />
        <FormInput
          {...register('time')}
          type="time"
          label="페스티벌 시간"
          error={errors.time?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('price')}
          type="text"
          label="페스티벌 가격"
          placeholder="ex) 150,000원"
          error={errors.price?.message}
        />
        <FormInput
          {...register('address')}
          type="text"
          label="페스티벌 주소"
          placeholder="ex) 서울특별시 송파구 올림픽로 424"
          error={errors.address?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <Controller
          control={control}
          name="posterImg"
          render={({ field }) => (
            <div className={styles.imageInputContainer}>
              <FormInput
                type="file"
                label="포스터 이미지"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  onPosterChange?.(file);
                  field.onChange(file);
                }}
                error={errors.posterImg?.message}
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
            </div>
          )}
        />
        <Controller
          control={control}
          name="logoImg"
          render={({ field }) => (
            <div className={styles.imageInputContainer}>
              <FormInput
                type="file"
                label="로고 이미지"
                placeholder="로고 이미지를 업로드해주세요."
                error={errors.logoImg?.message}
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  onLogoChange?.(file);
                  field.onChange(file);
                }}
              />
              {logoPreview && (
                <div className={styles.posterPreviewContainer}>
                  <img
                    src={logoPreview}
                    alt="로고 미리보기"
                    className={styles.posterPreview}
                  />
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export const FestivalStageFormField = ({
  register,
  errors,
  control,
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dates.0.stages',
  });

  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>스테이지 설정</h2>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.fieldGroup}>
          <FormInput
            {...register(`dates.0.stages.${index}.name`)}
            type="text"
            label="스테이지 이름"
            placeholder="ex) 메인 스테이지"
            error={errors.dates?.[0]?.stages?.[index]?.name?.message}
          />
          <FormInput
            {...register(`dates.0.stages.${index}.order`)}
            type="text"
            label="스테이지 순서"
            placeholder="스테이지 순서를 입력해주세요."
            error={errors.dates?.[0]?.stages?.[index]?.order?.message}
          />
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => remove(index)}
          >
            삭제
          </button>
        </div>
      ))}

      <button
        type="button"
        className={styles.addButton}
        onClick={() => append({ name: '', order: '', times: [] })}
      >
        + 스테이지 추가
      </button>
    </div>
  );
};

export const FestivalReservationFormField = ({
  register,
  errors,
  control,
  reservationLogoPreview,
  onReservationLogoChange,
}: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reservationUrls',
  });

  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>예매 링크</h2>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.fieldGroup}>
          <div className={styles.inputContainer}>
            <FormInput
              {...register(`reservationUrls.${index}.reservationUrl`)}
              type="text"
              label="예매 URL"
              placeholder="예매 URL을 입력해주세요."
              error={errors.reservationUrls?.[index]?.reservationUrl?.message}
            />
            <FormInput
              {...register(`reservationUrls.${index}.name`)}
              type="text"
              label="예매 사이트명"
              placeholder="예매 사이트명을 입력해주세요."
              error={errors.reservationUrls?.[index]?.name?.message}
            />
          </div>

          <Controller
            control={control}
            name={`reservationUrls.${index}.logoImg`}
            render={({ field }) => (
              <>
                <FormInput
                  type="file"
                  label="사이트 로고"
                  placeholder="사이트 로고를 입력해주세요."
                  error={errors.reservationUrls?.[index]?.logoImg?.message}
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    onReservationLogoChange?.(file);
                    field.onChange(file);
                  }}
                />
                {reservationLogoPreview && (
                  <div className={styles.posterPreviewContainer}>
                    <img
                      src={reservationLogoPreview}
                      alt="사이트 로고 미리보기"
                      className={styles.posterPreview}
                    />
                  </div>
                )}
              </>
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
            name: '',
            logoImg: new File([], ''),
          })
        }
        className={styles.addButton}
      >
        + 예매 링크 추가
      </button>
    </div>
  );
};

export const FestivalDateFormField = ({ register, errors, control }: Props) => {
  const {
    fields: dateFields,
    append: appendDate,
    remove: removeDate,
  } = useFieldArray({
    control,
    name: 'dates',
  });

  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>페스티벌 날짜 (타임테이블)</h2>

      {dateFields.map((date, dateIndex) => (
        <FestivalDateField
          key={date.id}
          dateIndex={dateIndex}
          register={register}
          errors={errors}
          control={control}
          onRemove={removeDate}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          appendDate({
            festivalAt: '',
            openAt: '',
            stages: [
              {
                name: '',
                order: '',
                times: [
                  { startAt: '', endAt: '', artists: [{ artistId: '' }] },
                ],
              },
            ],
          })
        }
        className={styles.addButton}
      >
        + 페스티벌 날짜 추가
      </button>
    </div>
  );
};
