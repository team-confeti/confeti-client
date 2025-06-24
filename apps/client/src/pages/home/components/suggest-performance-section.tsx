import { useNavigate } from 'react-router-dom';

import { Box, FestivalCard } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { SuggestPerformance } from '@shared/types/home-response';
import { convertToCdnUrl } from '@shared/utils/convert-to-cdn-url';

import * as styles from './suggest-performance-section.css';

const SuggestPerformanceSection = ({
  data,
  ref,
}: {
  data: SuggestPerformance[];
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  const navigate = useNavigate();

  return (
    <Box
      title="이런 공연은 어떠세요?"
      titleSize="lg"
      subtitle="confeti's pick!"
      subtitleIcon={<Icon name="heart-filled" size="1.4rem" />}
      className={styles.boxWrapper}
    >
      <div className={styles.container} ref={ref}>
        {data.map((performance) => (
          <div
            key={`${performance.typeId}-${performance.title}`}
            className={styles.cardWrapper}
          >
            <FestivalCard
              title={performance.title}
              imageSrc={convertToCdnUrl(performance.posterUrl, {
                width: 232,
                height: 330,
              })}
              onClick={() => {
                navigate(`/${performance.type}-detail/${performance.typeId}`);
              }}
            />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default SuggestPerformanceSection;
