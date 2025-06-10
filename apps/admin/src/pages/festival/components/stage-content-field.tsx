import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from 'react-hook-form';
import { z } from 'zod';

import FormInput from '@shared/components/form/form-input';

import { festivalSchema } from '../schemas/festival-schema';

import * as styles from './festival-form.css';

export interface Props {
  stageIndex: number;
  scheduleIndex: number;
  dateIndex: number;
  register: UseFormRegister<z.infer<typeof festivalSchema>>;
  errors: FieldErrors<z.infer<typeof festivalSchema>>;
  control: Control<z.infer<typeof festivalSchema>>;
  onRemoveSchedule: (index: number) => void;
  isActive: boolean;
}

function StageContentField({
  stageIndex,
  scheduleIndex,
  dateIndex,
  register,
  errors,
  control,
  onRemoveSchedule,
  isActive,
}: Props) {
  const stageFields = useFieldArray({
    control,
    name: `festivalDates.${dateIndex}.schedules.${scheduleIndex}.stages.${stageIndex}.artistIds`,
  });

  const startTimeFieldName =
    `festivalDates.${dateIndex}.schedules.${scheduleIndex}.stages.${stageIndex}.startTime` as const;
  const endTimeFieldName =
    `festivalDates.${dateIndex}.schedules.${scheduleIndex}.stages.${stageIndex}.endTime` as const;

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
          render={({ field }) => (
            <FormInput
              {...field}
              type="time"
              label={'공연 시작 시간'}
              placeholder="공연 시작 시간을 입력해주세요."
              error={
                errors.festivalDates?.[dateIndex]?.schedules?.[scheduleIndex]
                  ?.stages?.[stageIndex]?.startTime?.message
              }
            />
          )}
        />
        <Controller
          control={control}
          name={endTimeFieldName}
          render={({ field }) => (
            <FormInput
              {...field}
              type="time"
              label={'공연 종료 시간'}
              placeholder="공연 종료 시간을 입력해주세요."
              error={
                errors.festivalDates?.[dateIndex]?.schedules?.[scheduleIndex]
                  ?.stages?.[stageIndex]?.endTime?.message
              }
            />
          )}
        />
      </div>

      {stageFields.fields.map((artist, artistIndex) => (
        <div key={artist.id} className={styles.artistInputContainer}>
          <FormInput
            {...register(
              `festivalDates.${dateIndex}.schedules.${scheduleIndex}.stages.${stageIndex}.artistIds.${artistIndex}.value`,
            )}
            type="text"
            label={`아티스트 ID ${artistIndex + 1}`}
            placeholder="아티스트 ID를 입력해주세요."
            error={
              errors.festivalDates?.[dateIndex]?.schedules?.[scheduleIndex]
                ?.stages?.[stageIndex]?.artistIds?.[artistIndex]?.value?.message
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
        onClick={() => stageFields.append({ value: '' })}
      >
        아티스트 추가
      </button>
    </div>
  );
}

export default StageContentField;
