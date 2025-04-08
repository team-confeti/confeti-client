import { ReactNode } from 'react';

import { Avatar, Button, Description, SearchBar } from '@confeti/design-system';

import * as styles from './artist-select.css';

const mockArtists = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `오아시스 ${i + 1}`,
  src: 'https://i.scdn.co/image/ab6761610000f1786a50f39b95ce98a0e6bf5b21',
}));

interface artistSelectProps {
  children: ReactNode;
}

const ArtistSelect = ({ children }: artistSelectProps) => {
  return (
    <section className={styles.onboardingContentSection}>
      <Description
        descriptionText={['선호하는 아티스트를', '모두 선택해주세요']}
        fontSize={20}
      />
      <div className={styles.searchBarSection}>
        <SearchBar
          showBackButton={false}
          placeholder="아티스트를 검색해주세요"
        />
      </div>
      <div className={styles.avatarGridSection}>
        {mockArtists.map((artist) => (
          <div key={artist.id} className={styles.avatar}>
            <Avatar size="xl" src={artist.src} alt={`${artist.name} 이미지`} />
            <p className={styles.artistName}>{artist.name}</p>
          </div>
        ))}
      </div>
      {children}
    </section>
  );
};

export default ArtistSelect;
