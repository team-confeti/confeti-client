import { Box, FestivalCard } from '@confeti/design-system';
import { IcHeart } from '@confeti/design-system/icons';
import { CONFIG } from '@shared/constants/api';
import { SuggestPerformance } from '@shared/types/home-response';

import * as styles from './suggest-performance-section.css';

const SuggestPerformanceSection = ({
  data,
  ref,
}: {
  data: SuggestPerformance[];
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const formattedPerformData = (posterUrl: string) => {
    const posterPath = posterUrl.split(
      'confeti-bucket.s3.ap-northeast-2.amazonaws.com/',
    )[1];
    const cleanPath = posterPath ? posterPath.split('?')[0] : '';
    return `${CONFIG.IMAGE_CDN_URL}${cleanPath}?w=720&h=540&auto=format,enhance&q=75`;
  };
  return (
    <Box
      title="이런 공연은 어떠세요?"
      titleSize="lg"
      subtitle="confeti's pick!"
      subtitleIcon={<IcHeart width="1.4rem" height="1.4rem" />}
      className={styles.boxWrapper}
    >
      <div className={styles.container} ref={ref}>
        {data.map((performance) => (
          // TODO: response body에 고유한 id 값 추가 요청
          <div
            key={`${performance.typeId}-${performance.title}`}
            className={styles.cardWrapper}
          >
            <FestivalCard
              typeId={performance.typeId}
              type={performance.type}
              title={performance.title}
              imageSrc={formattedPerformData(performance.posterUrl)}
            />
          </div>
        ))}
      </div>
    </Box>
  );
};
export default SuggestPerformanceSection;
