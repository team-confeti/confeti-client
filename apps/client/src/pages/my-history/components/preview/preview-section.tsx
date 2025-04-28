import { useNavigate } from 'react-router-dom';

import { Box, Button, FestivalCard } from '@confeti/design-system';
import { MyTimeTable } from '@shared/types/my-history-response';

import * as styles from './preview-section.css';

const routeMap = {
  SET_LIST: 'setlist/add-setlist',
  TIME_TABLE: '/timetable/add-festival',
} as const;

interface Props {
  previewType: 'SET_LIST' | 'TIME_TABLE';
  title: string;
  showMore?: boolean;
  buttonLabel?: string;
  previewData?: MyTimeTable[];
  emptyMessage: string;
  ctaText: string;
  navigatePath?: string;
}

const PreviewSection = ({
  previewType,
  title,
  showMore = true,
  buttonLabel = '전체보기',
  previewData,
  emptyMessage,
  ctaText,
  navigatePath,
}: Props) => {
  const hasContent = previewData && previewData.length > 0;
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (previewType) {
      navigate(routeMap[previewType]);
    }
  };

  return (
    <Box
      title={title}
      showMore={showMore}
      showMoreText={buttonLabel}
      path={navigatePath}
    >
      {hasContent ? (
        <div className={styles.container}>
          {previewData.map((previewData) => (
            <FestivalCard
              key={previewData.typeId}
              typeId={previewData.typeId}
              title={previewData.title}
              imageSrc={previewData.posterUrl}
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
