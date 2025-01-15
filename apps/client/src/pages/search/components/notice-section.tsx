import * as styles from './notice-section.css';

interface NoticeSectionProps {
  isMultipleArtists: boolean;
}

const NoticeSection = ({ isMultipleArtists }: NoticeSectionProps) => {
  if (!isMultipleArtists) return null;

  return (
    <div className={styles.container}>
      찾으시는 아티스트가 아닌가요? 그룹명과 함께 검색해보세요!
    </div>
  );
};

export default NoticeSection;
