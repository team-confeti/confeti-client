import { useState } from 'react';
import ArtistList from '@pages/my/components/artist/artist-list';
import { useMyArtist } from '@pages/my/hooks/use-my-favorites';

import { Header } from '@confeti/design-system';
import { IcSwitch } from '@confeti/design-system/icons';
import { ArtistSortType } from '@shared/types/user-response';

import * as styles from './artist-more.css';

const ArtistMore = () => {
  const [sortOption, setSortOption] = useState<ArtistSortType>('createdAt');
  const { data } = useMyArtist(sortOption);

  const toggleSort = () => {
    setSortOption((prev) =>
      prev === 'createdAt' ? 'alphabetically' : 'createdAt',
    );
  };

  return (
    <>
      <Header variant="detail" title="My Artist" />
      <div className={styles.header}>
        <p>전체 {data.artistCount}</p>
        <button className={styles.sort} onClick={toggleSort}>
          <p>{sortOption === 'createdAt' ? '최근추가순' : '가나다순'}</p>
          <IcSwitch width={'1.6rem'} height={'1.6rem'} />
        </button>
      </div>

      <ArtistList artists={data.artists} />
    </>
  );
};
export default ArtistMore;
