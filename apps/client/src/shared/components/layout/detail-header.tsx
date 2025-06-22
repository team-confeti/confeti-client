import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@confeti/design-system/icon';

import * as styles from './detail-header.css';

interface Props {
  title?: string;
  icon?: ReactNode;
  isBackToHome?: boolean;
  handleNavigateToSettings?: () => void;
}

const DetailHeader = ({
  title = '',
  icon,
  isBackToHome = false,
  handleNavigateToSettings,
}: Props) => {
  const navigate = useNavigate();

  return (
    <header className={styles.container}>
      <button
        className={styles.button}
        onClick={() => (isBackToHome ? navigate('/') : navigate(-1))}
        aria-label="뒤로가기"
      >
        {icon || <Icon name="arrow-horizontal" size="2.2rem" rotate={180} />}
      </button>
      <h1 className={styles.title}>{title}</h1>

      {handleNavigateToSettings && (
        <button
          className={styles.settingsIcon}
          onClick={handleNavigateToSettings}
        >
          <Icon name="setting" size="2.4rem" />
        </button>
      )}
    </header>
  );
};

export default DetailHeader;
