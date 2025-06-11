import { Icon } from '@confeti/design-system/icon';

import * as styles from './more-button.css';

const MORE_BUTTON = {
  EXPANDED: {
    TEXT: '접기',
    ARIA_LABEL: '접기',
  },
  COLLAPSED: {
    TEXT: '더보기',
    ARIA_LABEL: '더보기',
  },
} as const;

interface MoreButtonProps {
  hasShadow?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

const MoreButton = ({
  hasShadow = false,
  isExpanded,
  onToggle,
}: MoreButtonProps) => {
  const buttonText = isExpanded
    ? MORE_BUTTON.EXPANDED.TEXT
    : MORE_BUTTON.COLLAPSED.TEXT;
  const ariaLabel = isExpanded
    ? MORE_BUTTON.EXPANDED.ARIA_LABEL
    : MORE_BUTTON.COLLAPSED.ARIA_LABEL;

  return (
    <button
      className={styles.button({ hasShadow })}
      onClick={onToggle}
      aria-label={ariaLabel}
    >
      <span className={styles.text}>{buttonText}</span>
      {isExpanded ? (
        <Icon name="arrow-vertical" size="1.6rem" />
      ) : (
        <Icon name="arrow-vertical" size="1.6rem" rotate={180} />
      )}
    </button>
  );
};

export default MoreButton;
