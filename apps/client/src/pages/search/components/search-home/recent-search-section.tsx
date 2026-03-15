import { useNavigate } from 'react-router-dom';

import { Chip } from '@confeti/design-system';

import { LogClickEvent, logClickEvent } from '@shared/analytics/logging';
import { routePath } from '@shared/router/path';
import { limitTextLength } from '@shared/utils/limit-text-length';

import { useRecentSearch } from '@pages/search/hooks/use-recent-search';

import * as styles from './recent-search-section.css';

const RecentSearchSection = () => {
  const navigate = useNavigate();
  const { recentSearches, removeSearchKeyword, clearSearchKeywords } =
    useRecentSearch();

  const hasRecentSearches = recentSearches.length > 0;

  const handleSearchKeywordClick = (keyword: string) => {
    navigate(`${routePath.SEARCH}?q=${encodeURIComponent(keyword)}`);
  };

  const handleDeleteSearchKeyword = (keyword: string) => {
    logClickEvent({
      name: 'click_search_recent_keyword_delete',
      params: { keyword },
    });
    removeSearchKeyword(keyword);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>최근 검색어</h1>
        {hasRecentSearches && (
          <LogClickEvent name="click_search_recent_keyword_clear_all">
            <button className={styles.clear} onClick={clearSearchKeywords}>
              모두 지우기
            </button>
          </LogClickEvent>
        )}
      </div>

      {hasRecentSearches ? (
        <div className={styles.scrollContainer}>
          <div className={styles.chipList}>
            {recentSearches.map((keyword) => (
              <LogClickEvent
                key={keyword}
                name="click_search_recent_keyword"
                params={{ keyword }}
              >
                <Chip
                  variant="input"
                  onDelete={() => handleDeleteSearchKeyword(keyword)}
                  onClick={() => handleSearchKeywordClick(keyword)}
                >
                  {limitTextLength(keyword, 5)}
                </Chip>
              </LogClickEvent>
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
