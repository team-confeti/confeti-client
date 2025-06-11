import { useState } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { z } from 'zod';

import FormInput from '@shared/components/form/form-input';
import { festivalSchema } from '@shared/schemas/festival-schema';

import * as styles from './festival-date-form-fields.css';

interface FestivalStageFormFieldProps {
  register: UseFormRegister<z.infer<typeof festivalSchema>>;
  errors: FieldErrors<z.infer<typeof festivalSchema>>;
  control: Control<z.infer<typeof festivalSchema>>;
}

export const FestivalStageFormField = ({
  register,
  errors,
  control,
}: FestivalStageFormFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dates.0.stages',
  });

  return (
    <div className={styles.stageSection}>
      <h2 className={styles.subTitle}>스테이지 설정</h2>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.fieldGroup}>
          <div className={styles.inputContainer}>
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
          </div>

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

interface FestivalDateFieldProps {
  dateIndex: number;
  register: UseFormRegister<z.infer<typeof festivalSchema>>;
  errors: FieldErrors<z.infer<typeof festivalSchema>>;
  control: Control<z.infer<typeof festivalSchema>>;
  onRemove: (index: number) => void;
}

export const FestivalDateField = ({
  dateIndex,
  register,
  errors,
  control,
  onRemove,
}: FestivalDateFieldProps) => {
  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control,
    name: `dates.${dateIndex}.stages`,
  });

  return (
    <div className={styles.dateSection}>
      <div className={styles.dateHeader}>
        <div className={styles.subTitle}>날짜 {dateIndex + 1}</div>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => {
            if (window.confirm('정말로 이 날짜를 삭제하시겠습니까?')) {
              onRemove(dateIndex);
            }
          }}
        >
          날짜 삭제
        </button>
      </div>

      <div className={styles.inputContainer}>
        <FormInput
          {...register(`dates.${dateIndex}.festivalAt`)}
          type="date"
          label="페스티벌 날짜"
          error={errors.dates?.[dateIndex]?.festivalAt?.message}
        />
        <FormInput
          {...register(`dates.${dateIndex}.openAt`)}
          type="time"
          label="티켓 오픈 시간"
          error={errors.dates?.[dateIndex]?.openAt?.message}
        />
      </div>

      {scheduleFields.map((schedule, scheduleIndex) => (
        <ScheduleField
          key={schedule.id}
          scheduleIndex={scheduleIndex}
          dateIndex={dateIndex}
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
            name: '',
            order: '',
            times: [{ startAt: '', endAt: '', artists: [{ artistId: '' }] }],
          })
        }
        className={styles.addButton}
      >
        + 공연 시간 추가
      </button>
    </div>
  );
};

interface ScheduleFieldProps {
  scheduleIndex: number;
  dateIndex: number;
  register: UseFormRegister<z.infer<typeof festivalSchema>>;
  errors: FieldErrors<z.infer<typeof festivalSchema>>;
  control: Control<z.infer<typeof festivalSchema>>;
  onRemove: (index: number) => void;
}

export const ScheduleField = ({
  scheduleIndex,
  dateIndex,
  register,
  errors,
  control,
  onRemove,
}: ScheduleFieldProps) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <div className={styles.subSection}>
      <div className={styles.stageTabs}>
        {[0, 1, 2].map((stageIndex) => (
          <button
            key={stageIndex}
            type="button"
            className={
              activeStage === stageIndex ? styles.activeTab : styles.tab
            }
            onClick={() => setActiveStage(stageIndex)}
          >
            스테이지 {stageIndex + 1}
          </button>
        ))}
      </div>

      {[0, 1, 2].map((stageIndex) => (
        <div
          key={stageIndex}
          style={{ display: activeStage === stageIndex ? 'block' : 'none' }}
        >
          <StageContentField
            stageIndex={stageIndex}
            scheduleIndex={scheduleIndex}
            dateIndex={dateIndex}
            register={register}
            errors={errors}
            control={control}
            onRemoveSchedule={onRemove}
            isActive={activeStage === stageIndex}
          />
        </div>
      ))}
    </div>
  );
};

interface StageContentFieldProps {
  stageIndex: number;
  scheduleIndex: number;
  dateIndex: number;
  register: UseFormRegister<z.infer<typeof festivalSchema>>;
  errors: FieldErrors<z.infer<typeof festivalSchema>>;
  control: Control<z.infer<typeof festivalSchema>>;
  onRemoveSchedule: (index: number) => void;
  isActive: boolean;
}

export const StageContentField = ({
  stageIndex,
  scheduleIndex,
  dateIndex,
  register,
  errors,
  control,
  onRemoveSchedule,
  isActive,
}: StageContentFieldProps) => {
  const stageFields = useFieldArray({
    control,
    name: `dates.${dateIndex}.stages.${scheduleIndex}.times.${stageIndex}.artists`,
  });

  const startTimeFieldName =
    `dates.${dateIndex}.stages.${scheduleIndex}.times.${stageIndex}.startAt` as const;
  const endTimeFieldName =
    `dates.${dateIndex}.stages.${scheduleIndex}.times.${stageIndex}.endAt` as const;

  return (
    <div className={styles.stageContent}>
      <div className={styles.stageHeader}>
        <div className={styles.subTitle}>스테이지 {stageIndex + 1}</div>
        {isActive && (
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => onRemoveSchedule(scheduleIndex)}
          >
            공연 시간 삭제
          </button>
        )}
      </div>

      <div className={styles.inputContainer}>
        <Controller
          control={control}
          name={startTimeFieldName}
          defaultValue=""
          render={({ field }) => (
            <FormInput
              {...field}
              type="time"
              label={'공연 시작 시간'}
              placeholder="공연 시작 시간을 입력해주세요."
              error={
                errors.dates?.[dateIndex]?.stages?.[scheduleIndex]?.times?.[
                  stageIndex
                ]?.startAt?.message
              }
            />
          )}
        />
        <Controller
          control={control}
          name={endTimeFieldName}
          defaultValue=""
          render={({ field }) => (
            <FormInput
              {...field}
              type="time"
              label={'공연 종료 시간'}
              placeholder="공연 종료 시간을 입력해주세요."
              error={
                errors.dates?.[dateIndex]?.stages?.[scheduleIndex]?.times?.[
                  stageIndex
                ]?.endAt?.message
              }
            />
          )}
        />
      </div>

      {stageFields.fields.map((artist, artistIndex) => (
        <div key={artist.id} className={styles.artistInputContainer}>
          <FormInput
            {...register(
              `dates.${dateIndex}.stages.${scheduleIndex}.times.${stageIndex}.artists.${artistIndex}.artistId`,
            )}
            type="text"
            label={`아티스트 ID ${artistIndex + 1}`}
            placeholder="아티스트 ID를 입력해주세요."
            error={
              errors.dates?.[dateIndex]?.stages?.[scheduleIndex]?.times?.[
                stageIndex
              ]?.artists?.[artistIndex]?.artistId?.message
            }
          />
          <button
            type="button"
            className={styles.deleteSmallButton}
            onClick={() => stageFields.remove(artistIndex)}
          >
            삭제
          </button>
        </div>
      ))}

      <button
        type="button"
        className={styles.addButton}
        onClick={() => stageFields.append({ artistId: '' })}
      >
        + 아티스트 추가
      </button>
    </div>
  );
};
