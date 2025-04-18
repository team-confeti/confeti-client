import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Avatar, Description, SearchBar } from '@confeti/design-system';
import { TopArtist } from '@shared/types/top-artist-response';

import ArtistSearch from './artist-search';

import * as styles from './artist-select.css';

interface artistSelectProps {
  artists: TopArtist[] | undefined;
  children: ReactNode;
}

const ArtistSelect = ({ children, artists }: artistSelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFocused = searchParams.get('search') === 'true';

  const handleSearchBarFocus = () => {
    setSearchParams({ search: 'true' });
  };
  // const handleArtistSelect = () => {
  //   setSearchParams({});
  // };

  if (isFocused) {
    return <ArtistSearch />;
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
            placeholder="아티스트를 검색해주세요"
            onFocus={handleSearchBarFocus}
          />
        </div>
        <div className={styles.avatarGridSection}>
          {artists?.map((artist) => (
            <div key={artist?.artistId} className={styles.avatar}>
              <Avatar
                size="xl"
                src={artist?.profileUrl}
                alt={`${artist.name} 이미지`}
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
