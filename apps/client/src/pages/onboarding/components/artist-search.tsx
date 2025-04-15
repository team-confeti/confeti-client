import { SearchBar } from '@confeti/design-system';

import * as styles from './artist-search.css';

interface ArtistSearchProps {
  handleArtistSelect: () => void;
}

//TODO : 검색결과 유무로 조건부 렌더링 로직 추가 및 아티스트 리스트 클릭 시 handleArtistSelect onClick전달
const ArtistSearch = ({ handleArtistSelect }: ArtistSearchProps) => {
  return (
    <>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarFrame}>
          <SearchBar placeholder="아티스트 또는 공연을 검색해보세요!" />
        </div>
      </div>
      <section className={styles.artistSearchContainer}>
        <p className={styles.artistSearchDescription}>
          선호하는 아티스트를 검색해보세요
        </p>
      </section>
    </>
  );
};

export default ArtistSearch;
