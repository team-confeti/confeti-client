import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Avatar, Description, SearchBar } from '@confeti/design-system';
import { onboard } from '@shared/types/onboard-response';

import ArtistSearch from './artist-search';

import * as styles from './artist-select.css';

interface artistSelectProps {
  artists: onboard[] | undefined;
  onArtistSelect: (artistId: string) => void;
  children: ReactNode;
}

const ArtistSelect = ({
  children,
  artists,
  onArtistSelect,
}: artistSelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFocused = searchParams.get('search') === 'true';

  const handleSearchBarFocus = () => {
    setSearchParams({ search: 'true' });
  };

  const handleSearchArtistSelect = () => {
    setSearchParams({});
  };

  if (isFocused) {
    return (
      <ArtistSearch
        onArtistSelect={onArtistSelect}
        handleSearchParams={handleSearchArtistSelect}
      />
    );
  } else {
    return (
      <section className={styles.onboardingContentSection}>
        <Description
          descriptionText={'선호하는 아티스트를\n모두 선택해주세요'}
          fontSize={20}
        />
        <div className={styles.searchBarSection}>
          <SearchBar
            showBackButton={false}
            placeholder="아티스트를 검색해주세요!"
            onFocus={handleSearchBarFocus}
          />
        </div>
        <div className={styles.avatarGridSection}>
          {artists?.map((artist) => (
            <div key={artist?.artistId} className={styles.avatar}>
              <Avatar
                size="xl"
                src={artist?.profileUrl}
                alt={`${artist?.name} 이미지`}
                onClick={() => onArtistSelect(artist?.artistId)}
              />
              <p className={styles.artistName}>{artist.name}</p>
            </div>
          ))}
        </div>
        {children}
      </section>
    );
  }
};

export default ArtistSelect;
