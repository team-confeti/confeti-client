import { useNavigate } from 'react-router-dom';

import { PopularSearchResponse } from '@shared/types/search-response';

import * as styles from './popular-search-section.css';

interface Props {
  popularSearchData: PopularSearchResponse;
}

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
