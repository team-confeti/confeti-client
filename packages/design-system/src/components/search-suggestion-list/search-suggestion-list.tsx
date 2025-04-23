import { CmpProfileNon } from '../../icons/src';

import * as styles from './search-suggestion-list.css';

interface RelatedKeyword {
  artistId: string;
  profileUrl: string;
  name: string;
}

interface SearchSuggestionListProps {
  relatedKeyword: RelatedKeyword[] | undefined;
  onArtistSelect?: (artistId: string) => void;
  handleSearchParams?: () => void;
  onClick?: (keyword: string) => void;
}

const SearchSuggestionList = ({
  relatedKeyword,
  onArtistSelect,
  handleSearchParams,
  onClick,
}: SearchSuggestionListProps) => {
  const handleClick = (artistId: string, name: string) => {
    onArtistSelect?.(artistId);
    if (handleSearchParams) {
      handleSearchParams();
    }
    onClick?.(name);
  };

  return (
    <ul className={styles.searchSuggestionListSection()}>
      {relatedKeyword?.map((artist) => (
        <li
          key={artist.artistId}
          className={styles.listContainer}
          onClick={() => handleClick(artist.artistId, artist.name)}
        >
          <div className={styles.listImageContainer}>
            {artist.profileUrl ? (
              <img
                className={styles.listImage}
                src={artist.profileUrl}
                alt={artist.name}
              />
            ) : (
              <CmpProfileNon className={styles.fallbackImage} />
            )}
          </div>
          <p className={styles.listText}>{artist.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default SearchSuggestionList;
