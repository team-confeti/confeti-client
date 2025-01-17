import * as styles from './stage.css';
interface Artist {
  artistId: string;
  artistName: string;
}

interface FestivalTimes {
  festivalTimeId: number;
  startAt: string;
  endAt: string;
  isSelected: boolean;
  artists: Artist[];
}

interface Stage {
  stageOrder: number;
  stageName: string;
  festivalTimes: FestivalTimes[];
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
      {timeTableInfo.stages.map(({ stageOrder, stageName }) => (
        <div key={stageOrder} className={styles.wrapper}>
          {stageName.replace(/ STAGE$/, '')}
          <br />
          STAGE
        </div>
      ))}
    </div>
  );
};

export default Stage;
