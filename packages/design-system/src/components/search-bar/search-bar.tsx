import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SvgBtnArrowLeft20 from '../../icons/src/BtnArrowLeft20';
import SvgBtnClose from '../../icons/src/BtnClose';
import SvgIcSicGray18 from '../../icons/src/IcSicGray18';

import * as styles from './search-bar.css';

interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const SearchBar = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
}: SearchBarProps) => {
  const textInput = useRef<HTMLInputElement>(null);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const navigate = useNavigate();

  const handleClear = () => {
    if (textInput.current) {
      textInput.current.value = '';
      textInput.current.focus();
      setShowClearBtn(false);
      if (onChange) {
        onChange({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowClearBtn(e.target.value.length > 0);
    if (onChange) {
      onChange(e);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <SvgBtnArrowLeft20
          width={20}
          height={20}
          onClick={handleBackClick}
          className={styles.arrowButton}
        />
        <div className={styles.searchBar({ type: 'default' })}>
          <SvgIcSicGray18
            className={styles.searchIcon}
            width={18}
            height={18}
          />
          <input
            className={styles.textSection}
            type="text"
            placeholder="아티스트를 검색해주세요"
            ref={textInput}
            value={value}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            enterKeyHint="search"
          />
          {showClearBtn && (
            <SvgBtnClose
              className={styles.closeBtn}
              onClick={handleClear}
              width={18}
              height={18}
              style={{ display: 'flex' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
