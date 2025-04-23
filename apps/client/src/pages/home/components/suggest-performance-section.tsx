import { Box, FestivalCard } from '@confeti/design-system';
import { IcHeart } from '@confeti/design-system/icons';
import { SuggestPerformance } from '@shared/types/home-response';

import * as styles from './suggest-performance-section.css';

const SuggestPerformanceSection = ({
  data,
  ref,
}: {
  data: SuggestPerformance[];
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  console.log(ref);
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
              imageSrc={performance.posterUrl}
            />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default SuggestPerformanceSection;
