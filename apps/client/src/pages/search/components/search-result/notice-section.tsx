import { SEARCH_NOT_FOUND_MESSAGE } from '@pages/search/constants/notice-message';

import * as styles from './notice-section.css';

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
