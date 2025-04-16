import { useState } from 'react';
import ArtistList from '@pages/my/components/artist/artist-list';
import { useMyArtistPreview } from '@pages/my/hooks/use-my-favorites';

import { Header } from '@confeti/design-system';
import { IcSwitch } from '@confeti/design-system/icons';
import { ARTISTS_DATA } from '@shared/mocks/artists-data';

import * as styles from './artist-more.css';

const ArtistMore = () => {
  const { data } = useMyArtistPreview();
  const [sortOption, setSortOption] = useState<'latest' | 'name'>('latest');

  if (!data) return null;

  // TODO: API 데이터 연결 (ARTISTS_DATA 제거)
  const allArtists = [...ARTISTS_DATA.artists, ...data.artists];
  const artistsCount = allArtists.length;

  const toggleSort = () => {
    setSortOption((prev) => (prev === 'latest' ? 'name' : 'latest'));
  };

  return (
    <>
      <Header variant="detail" title="My Artist" />
      <div className={styles.header}>
        <p>전체 {artistsCount}</p>
        <button className={styles.sort} onClick={toggleSort}>
          <p>{sortOption === 'latest' ? '최근추가순' : '가나다순'}</p>
          <IcSwitch width={'1.6rem'} height={'1.6rem'} />
        </button>
      </div>

      <ArtistList artists={allArtists} />
    </>
  );
};
export default ArtistMore;
