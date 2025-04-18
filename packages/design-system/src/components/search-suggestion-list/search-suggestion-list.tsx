import * as styles from './search-suggestion-list.css';

const SearchSuggestionList = () => {
  return (
    <li className={styles.listContainer}>
      <div className={styles.listImageContainer}>
        <img className={styles.listImage}></img>
      </div>
      <p className={styles.listText}></p>
    </li>
  );
};

export default SearchSuggestionList;
