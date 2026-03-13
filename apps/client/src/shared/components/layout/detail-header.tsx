import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@confeti/design-system/icon';

import { LogClickEvent } from '@shared/analytics/logging';

import * as styles from './detail-header.css';

interface Props {
  title?: string;
  icon?: ReactNode;
  isBackToHome?: boolean;
  rightIcon?: ReactNode;
  onBack?: () => void;
}

const DetailHeader = ({
  title = '',
  icon,
  isBackToHome = false,
  rightIcon,
  onBack,
}: Props) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (isBackToHome) {
      navigate('/');
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={styles.container}>
      <LogClickEvent name="click_navigation_back">
        <button
          className={styles.button}
          onClick={handleBack}
          aria-label="뒤로가기"
        >
          {icon || <Icon name="arrow-horizontal" size="2.2rem" rotate={180} />}
        </button>
      </LogClickEvent>
      <h1 className={styles.title}>{title}</h1>

      {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
    </header>
  );
};

export default DetailHeader;
