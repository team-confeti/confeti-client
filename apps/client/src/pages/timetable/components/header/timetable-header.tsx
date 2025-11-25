import { useNavigate } from 'react-router-dom';

import { Icon } from '@confeti/design-system/icon';

import * as styles from './timetable-header.css';

interface TimetableHeaderProps {
  title: string;
}

export const TimetableHeader = ({ title }: TimetableHeaderProps) => {
  const navigate = useNavigate();

  //TODO: 타임테이블 랜딩페이지 생기면 거기로 이동
  const handleClose = () => {
    navigate(-1);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <button
        type="button"
        className={styles.closeButton}
        onClick={handleClose}
        aria-label="닫기"
      >
        <Icon name="close" size="2.4rem" />
      </button>
    </header>
  );
};
