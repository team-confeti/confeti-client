import { Icon } from '../../icons';

import * as styles from './search-suggestion-list.css';

interface ArtistKeywordProps {
  id: string;
  title: string;
  profileUrl: string;
}

interface PerformanceKeywordProps {
  id: number;
  title: string;
  profileUrl: string;
}

interface ArtistSearchSuggestionListProps {
  relatedKeyword: ArtistKeywordProps[] | undefined;
  onSelectArtistId?: (id: string) => void;
  onSelectArtist?: (artist: {
    artistId: string;
    profileUrl: string;
    name: string;
  }) => void;
  onSelectKeyword?: (keyword: string, id: string) => void;
  handleSearchParams?: () => void;
  listType?: 'artist';
}

interface PerformanceSearchSuggestionListProps {
  relatedKeyword: PerformanceKeywordProps[] | undefined;
  onSelectKeyword?: (keyword: string, id: number) => void;
  handleSearchParams?: () => void;
  listType: 'performance';
}

type Props =
  | ArtistSearchSuggestionListProps
  | PerformanceSearchSuggestionListProps;

const SearchSuggestionList = (props: Props) => {
  const { relatedKeyword, handleSearchParams, listType } = props;

  if (listType === 'performance') {
    const handleClickPerformance = (id: number, title: string) => {
      props.onSelectKeyword?.(title, id);
      handleSearchParams?.();
    };

    return (
      <ul className={styles.searchSuggestionListSection()}>
        {relatedKeyword?.map((keyword) => (
          <li
            key={keyword.id}
            className={styles.listContainer}
            onPointerDown={() =>
              handleClickPerformance(keyword.id, keyword.title)
            }
          >
            <div className={styles.listImageContainer}>
              <Icon name="search-thumbnail" className={styles.fallbackImage} />
            </div>
            <p className={styles.listText}>{keyword.title}</p>
          </li>
        ))}
      </ul>
    );
  }

  const handleClickArtist = (id: string, title: string, profileUrl: string) => {
    props.onSelectArtistId?.(id);
    props.onSelectArtist?.({ artistId: id, profileUrl, name: title });
    props.onSelectKeyword?.(title, id);
    handleSearchParams?.();
  };

  return (
    <ul className={styles.searchSuggestionListSection()}>
      {relatedKeyword?.map((keyword) => (
        <li
          key={keyword.id}
          className={styles.listContainer}
          onPointerDown={() =>
            handleClickArtist(keyword.id, keyword.title, keyword.profileUrl)
          }
        >
          <div className={styles.listImageContainer}>
            {keyword.profileUrl ? (
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
