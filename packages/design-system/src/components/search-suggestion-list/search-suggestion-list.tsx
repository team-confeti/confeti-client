import { CmpSearchArtistImg, CmpSearchImg } from '../../icons/src';

import * as styles from './search-suggestion-list.css';

interface KeywordProps {
  id: string | number;
  title: string;
  profileUrl: string;
}

interface SearchSuggestionListProps {
  relatedKeyword: KeywordProps[] | undefined;
  onSelectArtistId?: (id: string) => void;
  onSelectKeyword?: (keyword: string, id: string | number) => void;
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
  const handleClick = (id: string | number, title: string) => {
    handleSearchParams?.();
    onSelectArtistId?.(id.toString());
    onSelectKeyword?.(title, id);
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
