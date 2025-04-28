import { useNavigate } from 'react-router-dom';

import { PopularSearchResponse } from '@shared/types/search-reponse';

import * as styles from './popular-search-section.css';

interface Props {
  popularSearchData: PopularSearchResponse;
}

export const POPULAR_KEYWORDS = [
  { typeId: 1, title: '인천 펜타포트 락 페스티벌', type: 'FESTIVAL' },
  { typeId: 2, title: '데이식스', type: 'ARTIST' },
  { typeId: 3, title: '그랜드 민트 페스티벌', type: 'FESTIVAL' },
  { typeId: 4, title: '아이묭', type: 'ARTIST' },
  { typeId: 5, title: '오아시스 내한공연', type: 'CONCERT' },
  { typeId: 6, title: '인천 펜타포트 락 페스티벌', type: 'CONCERT' },
  { typeId: 7, title: '더 글로우 2025', type: 'FESTIVAL' },
  { typeId: 8, title: '잔나비', type: 'ARTIST' },
  { typeId: 9, title: '실리카겔', type: 'ARTIST' },
  { typeId: 10, title: '검정치마', type: 'ARTIST' },
] as const;

export default function PopularSearchSection({ popularSearchData }: Props) {
  const navigate = useNavigate();

  const left = popularSearchData.popularTerms.slice(0, 5);
  const right = popularSearchData.popularTerms.slice(5, 10);

  const handleClick = (type: string) => {
    navigate(`/search?q=${type}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h1 className={styles.title}>인기 검색어</h1>
      </div>

      <div className={styles.columns}>
        <ol className={styles.list}>
          {left.map((item, index) => (
            <li key={item.rank}>
              <button
                className={styles.item}
                onClick={() => handleClick(item.popularTerm)}
              >
                <span
                  className={styles.rank({
                    rank: index < 3 ? 'top' : 'default',
                  })}
                >
                  {index + 1}
                </span>
                <span className={styles.keyword}>{item.popularTerm}</span>
              </button>
            </li>
          ))}
        </ol>
        <ol className={styles.list}>
          {right.map((item, index) => (
            <li key={item.rank}>
              <button
                className={styles.item}
                onClick={() => handleClick(item.popularTerm)}
              >
                <span className={styles.rank({ rank: 'default' })}>
                  {index + 6}
                </span>
                <span className={styles.keyword}>{item.popularTerm}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
