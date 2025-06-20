import { useNavigate } from 'react-router-dom';

import { Box, Button, FestivalCard } from '@confeti/design-system';

import { routePath } from '@shared/router/path';
import {
  MyHistorySetList,
  MyTimeTable,
} from '@shared/types/my-history-response';
import { buildPath } from '@shared/utils/build-path';

import * as styles from './preview-section.css';

const routeMap = {
  SET_LIST: 'setlist/add-setlist',
  TIME_TABLE: '/timetable/add-festival',
} as const;

interface BaseProps {
  title: string;
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
  buttonLabel = '전체보기',
  previewData,
  emptyMessage,
  ctaText,
  navigatePath,
}: PreviewSectionProps) => {
  const hasContent = previewData && previewData.length > 0;
  const navigate = useNavigate();

  const handleShowMore = () => {
    if (navigatePath) {
      navigate(navigatePath);
    }
  };

  const handleButtonClick = () => {
    navigate(routeMap[previewType]);
  };

  const handleNavigateToDetail = (setlistId: number) => {
    navigate(buildPath(routePath.MY_HISTORY_SETLIST_DETAIL, { setlistId }));
  };

  const handleNavigateToTimeTable = () => {
    navigate(routePath.TIME_TABLE_OUTLET);
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
          onClick={() => handleNavigateToDetail(previewData.setlistId)}
        />
      ));
    }

    return previewData.map((previewData) => (
      <FestivalCard
        key={previewData.typeId}
        typeId={previewData.typeId}
        title={previewData.title}
        imageSrc={previewData.posterUrl}
        onClick={handleNavigateToTimeTable}
      />
    ));
  };

  return (
    <Box title={title} showMoreText={buttonLabel} onShowMore={handleShowMore}>
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
