import * as styles from './notice-section.css';
import { SEARCH_NOT_FOUND_MESSAGE } from '../constants/notice-message';

interface NoticeSectionProps {
  isMultipleArtists?: boolean;
}

const NoticeSection = ({ isMultipleArtists }: NoticeSectionProps) => {
  if (!isMultipleArtists) return null;

  return (
    <div className={styles.container}>
      {SEARCH_NOT_FOUND_MESSAGE.MULTIPLE_ARTISTS_NOTICE}
    </div>
  );
};

export default NoticeSection;
