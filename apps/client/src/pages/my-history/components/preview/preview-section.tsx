import { useNavigate } from 'react-router-dom';

import { Box, Button, FestivalCard } from '@confeti/design-system';
import {
  MyHistorySetList,
  MyTimeTable,
} from '@shared/types/my-history-response';

import * as styles from './preview-section.css';

const SETLIST_DETAIL_PATH = (setlistId: number) =>
  `/my-history/setlist-detail/${setlistId}`;

const routeMap = {
  SET_LIST: 'setlist/add-setlist',
  TIME_TABLE: '/timetable/add-festival',
} as const;

interface BaseProps {
  title: string;
  showMore?: boolean;
  buttonLabel?: string;
  emptyMessage: string;
  ctaText: string;
  navigatePath?: string;
}

type PreviewSectionProps =
  | ({ previewType: 'SET_LIST'; previewData: MyHistorySetList[] } & BaseProps)
  | ({ previewType: 'TIME_TABLE'; previewData: MyTimeTable[] } & BaseProps);

const isSetListPreviewData = (
  data: MyHistorySetList[] | MyTimeTable[] | undefined,
): data is MyHistorySetList[] => {
  return Array.isArray(data) && data.length > 0 && 'setlistId' in data[0];
};

const PreviewSection = ({
  previewType,
  title,
  showMore = true,
  buttonLabel = '전체보기',
  previewData,
  emptyMessage,
  ctaText,
  navigatePath,
}: PreviewSectionProps) => {
  const hasContent = previewData && previewData.length > 0;
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(routeMap[previewType]);
  };

  const renderPreviewList = () => {
    if (!previewData || previewData.length === 0) return null;

    if (isSetListPreviewData(previewData)) {
      return previewData.map((previewData) => (
        <FestivalCard
          key={previewData.typeId}
          typeId={previewData.typeId}
          title={previewData.title}
          imageSrc={previewData.posterUrl}
          onClick={() => navigate(SETLIST_DETAIL_PATH(previewData.setlistId))}
        />
      ));
    }

    return previewData.map((previewData) => (
      <FestivalCard
        key={previewData.typeId}
        typeId={previewData.typeId}
        title={previewData.title}
        imageSrc={previewData.posterUrl}
      />
    ));
  };

  return (
    <Box
      title={title}
      showMore={showMore}
      showMoreText={buttonLabel}
      path={navigatePath}
    >
      {hasContent ? (
        <div className={styles.container}>{renderPreviewList()}</div>
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
