import { useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
} from 'react-hook-form';
import { UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

import FormInput from '@shared/components/form/form-input';
import { useImagePreview } from '@shared/hooks/use-image-preview';
import { useZodForm } from '@shared/hooks/use-zod-form';

import {
  festivalDefaultValues,
  festivalSchema,
} from '../schemas/festival-schema';

import * as styles from './festival-form.css';

interface Props {
  register: UseFormRegister<z.infer<typeof festivalSchema>>;
  errors: FieldErrors<z.infer<typeof festivalSchema>>;
  control: Control<z.infer<typeof festivalSchema>>;
}

function FestivalBasicFormField({ register, errors, control }: Props) {
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const posterPreview = useImagePreview(posterFile);
  const logoPreview = useImagePreview(logoFile);

  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>기본 정보</h2>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('title')}
          type="text"
          label="페스티벌 제목"
          placeholder="페스티벌 제목을 입력해주세요."
          error={errors.title?.message}
        />
        <FormInput
          {...register('subTitle')}
          type="text"
          label="페스티벌 부제목"
          placeholder="페스티벌 부제목을 입력해주세요."
          error={errors.subTitle?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('startDate')}
          type="date"
          label="페스티벌 시작일"
          placeholder="페스티벌 시작일을 입력해주세요."
          error={errors.startDate?.message}
        />
        <FormInput
          {...register('endDate')}
          type="date"
          label="페스티벌 종료일"
          placeholder="페스티벌 종료일을 입력해주세요."
          error={errors.endDate?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('location')}
          type="text"
          label="페스티벌 장소"
          placeholder="페스티벌 장소를 입력해주세요."
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
          {...register('festivalTime')}
          type="text"
          label="콘서트 시간"
          placeholder="콘서트 시간을 입력해주세요."
          error={errors.festivalTime?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <FormInput
          {...register('festivalPrice')}
          type="text"
          label="콘서트 가격"
          placeholder="콘서트 가격을 입력해주세요."
          error={errors.festivalPrice?.message}
        />
        <FormInput
          {...register('festivalAddress')}
          type="text"
          label="콘서트 주소"
          placeholder="콘서트 주소를 입력해주세요."
          error={errors.festivalAddress?.message}
        />
      </div>
      <div className={styles.inputContainer}>
        <Controller
          control={control}
          name="posterImage"
          render={({ field }) => (
            <div className={styles.imageInputContainer}>
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
            </div>
          )}
        />
        <Controller
          control={control}
          name="festivalLogo"
          render={({ field }) => (
            <div className={styles.imageInputContainer}>
              <FormInput
                type="file"
                label="로고 이미지"
                placeholder="로고 이미지를 업로드해주세요."
                error={errors.festivalLogo?.message}
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setLogoFile(file);
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
}

function FestivalStageFormField({ register, errors, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'festivalStages',
  });

  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>스테이지 설정</h2>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.fieldSection}>
          <FormInput
            {...register(`festivalStages.${index}.stageTitle`)}
            type="text"
            label="스테이지 이름"
            placeholder="스테이지 이름을 입력해주세요."
            error={errors.festivalStages?.[index]?.stageTitle?.message}
          />
          <FormInput
            {...register(`festivalStages.${index}.stageOrder`)}
            type="text"
            label="스테이지 순서"
            placeholder="스테이지 순서를 입력해주세요."
            error={errors.festivalStages?.[index]?.stageOrder?.message}
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
        onClick={() => append({ stageTitle: '', stageOrder: '' })}
      >
        스테이지 추가
      </button>
    </div>
  );
}

function FestivalReservationFormField({ register, errors, control }: Props) {
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

interface ScheduleFieldProps {
  scheduleIndex: number;
  register: UseFormRegister<z.infer<typeof festivalSchema>>;
  errors: FieldErrors<z.infer<typeof festivalSchema>>;
  control: Control<z.infer<typeof festivalSchema>>;
  onRemove: (index: number) => void;
}

const ScheduleField = ({
  scheduleIndex,
  register,
  errors,
  control,
  onRemove,
}: ScheduleFieldProps) => {
  const {
    fields: artistFields,
    append: appendArtist,
    remove: removeArtist,
  } = useFieldArray({
    control,
    name: `schedules.${scheduleIndex}.artistIds`,
  });

  return (
    <div className={styles.fieldSection}>
      <h3 className={styles.subTitle}>스테이지 {scheduleIndex + 1}</h3>
      <div className={styles.inputContainer}>
        <FormInput
          {...register(`schedules.${scheduleIndex}.startTime`)}
          type="text"
          label="공연 시작 시간"
          placeholder="공연 시작 시간을 입력해주세요."
          error={errors.schedules?.[scheduleIndex]?.startTime?.message}
        />
        <FormInput
          {...register(`schedules.${scheduleIndex}.endTime`)}
          type="text"
          label="공연 종료 시간"
          placeholder="공연 종료 시간을 입력해주세요."
          error={errors.schedules?.[scheduleIndex]?.endTime?.message}
        />
      </div>

      {artistFields.map((artist, artistIndex) => (
        <div key={artist.id} className={styles.artistInputContainer}>
          <FormInput
            {...register(
              `schedules.${scheduleIndex}.artistIds.${artistIndex}.value`,
            )}
            type="text"
            label={`아티스트 ID ${artistIndex + 1}`}
            placeholder="아티스트 ID를 입력해주세요."
            error={
              errors.schedules?.[scheduleIndex]?.artistIds?.[artistIndex]?.value
                ?.message
            }
          />
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => removeArtist(artistIndex)}
          >
            삭제
          </button>
        </div>
      ))}

      <button
        type="button"
        className={styles.addButton}
        onClick={() => appendArtist({ value: '' })}
      >
        아티스트 추가
      </button>

      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => onRemove(scheduleIndex)}
      >
        공연 시간 삭제
      </button>
    </div>
  );
};

const FestivalDateFormField = ({ register, errors, control }: Props) => {
  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control,
    name: 'schedules',
  });

  return (
    <div className={styles.fieldSection}>
      <h2 className={styles.title}>페스티벌 날짜 (타임테이블)</h2>

      <div className={styles.inputContainer}>
        <FormInput
          {...register('festivalDate')}
          type="text"
          label="페스티벌 날짜"
          placeholder="페스티벌 날짜를 입력해주세요."
          error={errors.festivalDate?.message}
        />
        <FormInput
          {...register('ticketOpenTime')}
          type="text"
          label="티켓 오픈 시간"
          placeholder="티켓 오픈 시간을 입력해주세요."
          error={errors.ticketOpenTime?.message}
        />
      </div>

      {scheduleFields.map((schedule, index) => (
        <ScheduleField
          key={schedule.id}
          scheduleIndex={index}
          register={register}
          errors={errors}
          control={control}
          onRemove={removeSchedule}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          appendSchedule({
            startTime: '',
            endTime: '',
            artistIds: [],
          })
        }
        className={styles.addButton}
      >
        공연 시간 추가
      </button>
    </div>
  );
};

type Tab = 'basic' | 'date';

const FestivalForm = () => {
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

  const onSubmit = (data: z.infer<typeof festivalSchema>) => {
    console.log(data);
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
        저장하기
      </button>
    </form>
  );
};

export default FestivalForm;
