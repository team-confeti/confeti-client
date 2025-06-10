import { useState } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

import { festivalSchema } from '../../../shared/schemas/festival-schema';
import StageContentField from './stage-content-field';

import * as styles from './festival-form.css';

export interface Props {
  scheduleIndex: number;
  dateIndex: number;
  register: UseFormRegister<z.infer<typeof festivalSchema>>;
  errors: FieldErrors<z.infer<typeof festivalSchema>>;
  control: Control<z.infer<typeof festivalSchema>>;
  onRemove: (index: number) => void;
}

function ScheduleField({
  scheduleIndex,
  dateIndex,
  register,
  errors,
  control,
  onRemove,
}: Props) {
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
}

export default ScheduleField;
