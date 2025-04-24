import { CmpSearchArtistImg, CmpSearchImg } from '../../icons/src';

import * as styles from './search-suggestion-list.css';

interface KeywordProps {
  id: string;
  title: string;
  profileUrl: string;
}

interface SearchSuggestionListProps {
  relatedKeyword: KeywordProps[] | undefined;
  onSelectArtistId?: (id: string) => void;
  onSelectKeyword?: (keyword: string) => void;
  handleSearchParams?: () => void;
  listType?: 'artist' | 'performance';
}

const SearchSuggestionList = ({
  relatedKeyword,
  onSelectArtistId,
  onSelectKeyword,
  handleSearchParams,
  listType,
}: SearchSuggestionListProps) => {
  const handleClick = (id: string, title: string) => {
    handleSearchParams?.();
    onSelectArtistId?.(id);
    onSelectKeyword?.(title);
  };

  return (
    <ul className={styles.searchSuggestionListSection()}>
      {relatedKeyword?.map((keyword) => (
        <li
          key={keyword.id}
          className={styles.listContainer}
          onClick={() => handleClick(keyword.id, keyword.title)}
        >
          <div className={styles.listImageContainer}>
            {listType === 'performance' ? (
              <CmpSearchImg className={styles.fallbackImage} />
            ) : keyword.profileUrl ? (
              <img
                className={styles.listImage}
                src={keyword.profileUrl}
                alt={keyword.title}
              />
            ) : (
              <CmpSearchArtistImg className={styles.fallbackImage} />
            )}
          </div>
          <p className={styles.listText}>{keyword.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestionList;
