import { useNavigate } from 'react-router-dom';

import { Box, Button, FestivalCard } from '@confeti/design-system';
import { Performance } from '@shared/types/user-response';

import * as styles from './preview-section.css';

const routeMap = {
  SET_LIST: '/setlist/add-setlist', // TODO: SET_LIST 실제 경로로 변경
  TIME_TABLE: '/timetable/add-festival',
} as const;

interface Props {
  previewType: 'SET_LIST' | 'TIME_TABLE';
  title: string;
  showMore?: boolean;
  buttonLabel?: string;
  performances?: Performance[];
  emptyMessage: string;
  ctaText: string;
}

const PreviewSection = ({
  previewType,
  title,
  showMore = true,
  buttonLabel = '전체보기',
  performances,
  emptyMessage,
  ctaText,
}: Props) => {
  const hasContent = performances && performances.length > 0;
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (previewType) {
      navigate(routeMap[previewType]);
    }
  };

  return (
    <Box title={title} showMore={showMore} showMoreText={buttonLabel}>
      {hasContent ? (
        <div className={styles.container}>
          {performances.map((performance) => (
            <FestivalCard
              key={performance.index}
              typeId={performance.typeId}
              type={performance.type}
              title={performance.title}
              imageSrc={performance.posterUrl}
            />
          ))}
        </div>
      ) : (
        <h4 className={styles.description}>{emptyMessage}</h4>
      )}
      <Button
        className={styles.button}
        text={ctaText}
        onClick={handleButtonClick}
      />
    </Box>
  );
};

export default PreviewSection;
