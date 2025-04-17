import { useNavigate } from 'react-router-dom';

import { Chip } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import { limitTextLength } from '@shared/utils/limit-text-length';

import { RECENT_SEARCHES } from '../mocks/search-data';

import * as styles from './recent-search-section.css';

export default function RecentSearchSection() {
  const navigate = useNavigate();
  const hasRecentSearches = RECENT_SEARCHES.length > 0;

  const handleSearchKeywordClick = (keyword: string) => {
    navigate(`${routePath.SEARCH}?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>최근 검색어</h1>
        {hasRecentSearches && (
          <button className={styles.clear}>모두 지우기</button> //TODO: 최근 검색어 전체 항목 삭제 API 연동 예정
        )}
      </div>

      {hasRecentSearches ? (
        <div className={styles.scrollContainer}>
          <div className={styles.chipList}>
            {RECENT_SEARCHES.map((keyword) => (
              <Chip
                key={keyword}
                label={limitTextLength(keyword, 5)}
                variant="withDelete"
                onDelete={() => console.log(`${keyword} 삭제`)} // TODO: 최근 검색어 단일 항목 삭제 API 연동 예정
                onClick={() => handleSearchKeywordClick(keyword)}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className={styles.emptyText}>최근 검색 기록이 없어요.</p>
      )}
    </section>
  );
}
