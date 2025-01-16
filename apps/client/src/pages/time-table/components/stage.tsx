import * as styles from './stage.css';
interface Artist {
  artistId: string;
  name: string;
  startAt: string;
  endAt: string;
  isSelected: boolean;
}

interface Stage {
  stageId: number;
  name: string;
  artists: Artist[];
}

interface TimeTableInfo {
  ticketOpenAt: string;
  stageCount: number;
  stages: Stage[];
}

interface StageProps {
  timeTableInfo: TimeTableInfo;
}

const Stage = ({ timeTableInfo }: StageProps) => {
  return (
    <div className={styles.stageWrapper}>
      {timeTableInfo.stages.map(({ stageId, name }) => (
        <div key={stageId} className={styles.wrapper}>
          {name.replace(/ STAGE$/, '')}
          <br />
          STAGE
        </div>
      ))}
    </div>
  );
};

export default Stage;
