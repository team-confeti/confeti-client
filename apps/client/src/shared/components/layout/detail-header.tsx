import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@confeti/design-system/icon';

import * as styles from './detail-header.css';

interface Props {
  title?: string;
  icon?: ReactNode;
  isBackToHome?: boolean;
  rightIcon?: ReactNode;
}

const DetailHeader = ({
  title = '',
  icon,
  isBackToHome = false,
  rightIcon,
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

      {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
    </header>
  );
};

export default DetailHeader;
