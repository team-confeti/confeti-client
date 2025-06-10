import { useFieldArray } from 'react-hook-form';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

import FormInput from '@shared/components/form/form-input';

import { festivalSchema } from '../schemas/festival-schema';
import ScheduleField from './schedule-field';

import * as styles from './festival-form.css';

interface Props {
  dateIndex: number;
  register: UseFormRegister<z.infer<typeof festivalSchema>>;
  errors: FieldErrors<z.infer<typeof festivalSchema>>;
  control: Control<z.infer<typeof festivalSchema>>;
  onRemove: (index: number) => void;
}

function FestivalDateField({
  dateIndex,
  register,
  errors,
  control,
  onRemove,
}: Props) {
  const {
    fields: scheduleFields,
    append: appendSchedule,
    remove: removeSchedule,
  } = useFieldArray({
    control,
    name: `festivalDates.${dateIndex}.schedules`,
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
          {...register(`festivalDates.${dateIndex}.date`)}
          type="date"
          label="페스티벌 날짜"
          placeholder="페스티벌 날짜를 입력해주세요."
          error={errors.festivalDates?.[dateIndex]?.date?.message}
        />
        <FormInput
          {...register(`festivalDates.${dateIndex}.ticketOpenTime`)}
          type="time"
          label="티켓 오픈 시간"
          placeholder="티켓 오픈 시간을 입력해주세요."
          error={errors.festivalDates?.[dateIndex]?.ticketOpenTime?.message}
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
            stages: [
              { startTime: '', endTime: '', artistIds: [{ value: '' }] },
              { startTime: '', endTime: '', artistIds: [{ value: '' }] },
              { startTime: '', endTime: '', artistIds: [{ value: '' }] },
            ],
          })
        }
        className={styles.addButton}
      >
        공연 시간 추가
      </button>
    </div>
  );
}

export default FestivalDateField;
