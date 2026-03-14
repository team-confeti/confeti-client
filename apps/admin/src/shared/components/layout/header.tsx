import { Menu, Search, X } from 'lucide-react';

import * as styles from './header.css';

interface Props {
  title: string;
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header = ({ title, onMenuClick, searchQuery, onSearchChange }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onSearchChange('');
      e.currentTarget.blur();
    }
  };

  return (
    <header className={styles.container}>
      <div className={styles.leftSection}>
        <button onClick={onMenuClick} className={styles.menuButton}>
          <Menu size={20} />
        </button>
        <h2 className={styles.title}>{title}</h2>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="공연명, 장소 검색..."
            className={styles.searchInput}
          />
          {searchQuery && (
            <button
              className={styles.clearButton}
              onClick={() => onSearchChange('')}
              type="button"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
