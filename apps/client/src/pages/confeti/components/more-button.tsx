import * as styles from './more-button.css';
import {
  IcArrowDownGray16,
  IcArrowUpGray16,
} from '@confeti/design-system/icons';

interface MoreButtonProps {
  hasShadow?: boolean;
  isExpanded: boolean; // 부모에서 전달받은 상태
  onToggle: () => void; // 상태 변경을 알리는 함수
}

const MoreButton = ({
  hasShadow = false,
  isExpanded,
  onToggle,
}: MoreButtonProps) => {
  return (
    <button
      className={styles.button({ hasShadow })}
      onClick={onToggle}
      aria-label={isExpanded ? '접기' : '더보기'}
    >
      <span className={styles.text}>{isExpanded ? '접기' : '더보기'}</span>
      {isExpanded ? (
        <IcArrowUpGray16 className={styles.icon} />
      ) : (
        <IcArrowDownGray16 className={styles.icon} />
      )}
    </button>
  );
};

export default MoreButton;
