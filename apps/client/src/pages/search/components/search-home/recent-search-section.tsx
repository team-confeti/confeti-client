import { useNavigate } from 'react-router-dom';
import { useRecentSearch } from '@pages/search/hooks/use-recent-search';

import { Chip } from '@confeti/design-system';
import { routePath } from '@shared/router/path';
import { limitTextLength } from '@shared/utils/limit-text-length';

import * as styles from './recent-search-section.css';

const RecentSearchSection = () => {
  const navigate = useNavigate();
  const { recentSearches, removeSearchKeyword, clearSearchKeywords } =
    useRecentSearch();

  const hasRecentSearches = recentSearches.length > 0;

  const handleSearchKeywordClick = (keyword: string) => {
    navigate(`${routePath.SEARCH}?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>최근 검색어</h1>
        {hasRecentSearches && (
          <button className={styles.clear} onClick={clearSearchKeywords}>
            모두 지우기
          </button>
        )}
      </div>

      {hasRecentSearches ? (
        <div className={styles.scrollContainer}>
          <div className={styles.chipList}>
            {recentSearches.map((keyword) => (
              <Chip
                key={keyword}
                label={limitTextLength(keyword, 5)}
                variant="withDelete"
                onDelete={() => removeSearchKeyword(keyword)}
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
};

export default RecentSearchSection;
