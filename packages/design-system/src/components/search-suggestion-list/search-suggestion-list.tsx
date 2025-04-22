import { CmpProfileNon } from '../../icons/src';

import * as styles from './search-suggestion-list.css';

interface RelatedKeyword {
  artistId: string;
  profileUrl: string;
  name: string;
}

interface SearchSuggestionListProps {
  relatedKeyword: RelatedKeyword[] | undefined;
  onClick: (keyword: string) => void;
}

const SearchSuggestionList = ({
  relatedKeyword,
  onClick,
}: SearchSuggestionListProps) => {
  return (
    <ul className={styles.searchSuggestionListSection()}>
      {relatedKeyword?.map((artist) => (
        <li
          key={artist.artistId}
          className={styles.listContainer}
          onClick={() => onClick(artist.name)}
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
