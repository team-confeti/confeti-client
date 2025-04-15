import { SearchBar } from '@confeti/design-system';

import * as styles from './artist-search.css';

//TODO : 검색결과 length로 조건부 렌더링 로직 추가
const ArtistSearch = () => {
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
