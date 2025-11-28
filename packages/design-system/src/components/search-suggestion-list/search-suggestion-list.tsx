import { Icon } from '../../icons';

import * as styles from './search-suggestion-list.css';

interface KeywordProps {
  id: string | number;
  title: string;
  profileUrl: string;
}

interface Props {
  relatedKeyword: KeywordProps[] | undefined;
  onSelectArtistId?: (id: string) => void;
  onSelectArtist?: (artist: {
    artistId: string;
    profileUrl: string;
    name: string;
  }) => void;
  onSelectKeyword?: (keyword: string, id: string | number) => void;
  handleSearchParams?: () => void;
  listType?: 'artist' | 'performance';
}

const SearchSuggestionList = ({
  relatedKeyword,
  onSelectArtistId,
  onSelectArtist,
  onSelectKeyword,
  handleSearchParams,
  listType,
}: Props) => {
  const handleClick = (
    id: string | number,
    title: string,
    profileUrl: string,
  ) => {
    onSelectArtistId?.(id.toString());
    onSelectArtist?.({ artistId: id.toString(), profileUrl, name: title });
    onSelectKeyword?.(title, id);
    handleSearchParams?.();
  };

  return (
    <ul className={styles.searchSuggestionListSection()}>
      {relatedKeyword?.map((keyword) => (
        <li
          key={keyword.id}
          className={styles.listContainer}
          onPointerDown={() =>
            handleClick(keyword.id, keyword.title, keyword.profileUrl)
          }
        >
          <div className={styles.listImageContainer}>
            {listType === 'performance' ? (
              <Icon name="search-thumbnail" className={styles.fallbackImage} />
            ) : keyword.profileUrl ? (
              <img
                className={styles.listImage}
                src={keyword.profileUrl}
                alt={keyword.title}
              />
            ) : (
              <Icon
                name="logo-thumbnail"
                className={styles.fallbackImage}
                style={
                  {
                    '--icon-bg': '#FFFFFF',
                    '--icon-fg': '#EFF0F4',
                  } as React.CSSProperties
                }
              />
            )}
          </div>
          <p className={styles.listText}>{keyword.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestionList;
