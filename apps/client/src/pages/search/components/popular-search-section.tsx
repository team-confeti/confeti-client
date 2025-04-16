import { useNavigate } from 'react-router-dom';

import { POPULAR_KEYWORDS } from '../mocks/search-data';

import * as styles from './popular-search-section.css';

export default function PopularSearchSection() {
  const navigate = useNavigate();

  const left = POPULAR_KEYWORDS.slice(0, 5);
  const right = POPULAR_KEYWORDS.slice(5, 10);

  const handleClick = (typeId: number, type: string) => {
    navigate(`/${type}-detail/${typeId}`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>인기 검색어</h2>
      </div>

      <div className={styles.columns}>
        <ol className={styles.list}>
          {left.map((item, index) => (
            <li key={item.typeId}>
              <button
                className={styles.item}
                onClick={() => handleClick(item.typeId, item.type)}
              >
                <span
                  className={styles.rank({
                    rank: index < 3 ? 'top' : 'default',
                  })}
                >
                  {index + 1}
                </span>
                <span className={styles.keyword}>{item.title}</span>
              </button>
            </li>
          ))}
        </ol>
        <ol className={styles.list}>
          {right.map((item, index) => (
            <li key={item.typeId}>
              <button
                className={styles.item}
                onClick={() => handleClick(item.typeId, item.type)}
              >
                <span className={styles.rank({ rank: 'default' })}>
                  {index + 6}
                </span>
                <span className={styles.keyword}>{item.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
