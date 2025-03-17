import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SvgIcNewSearchGray18 from '../../icons/src/IcNewSearchGray18';
import SvgBtnArrowLeft20 from '../../icons/src/BtnArrowLeft20';
import SvgBtnClose from '../../icons/src/BtnClose';
import * as styles from './search-bar.css';

interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  showBackButton?: boolean;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  onKeyDown,
  onFocus,
  showBackButton = true,
  placeholder = '아티스트 또는 공연을 검색해보세요!',
}: SearchBarProps) => {
  const textInput = useRef<HTMLInputElement>(null);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleClear = () => {
    if (textInput.current) {
      textInput.current.value = '';
      textInput.current.focus();
      setShowClearBtn(false);
      setIsFocused(false);
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
        {showBackButton && (
          <SvgBtnArrowLeft20
            width={20}
            height={20}
            onClick={handleBackClick}
            className={styles.arrowButton}
          />
        )}
        <div className={styles.searchBar({ type: 'default' })}>
          <SvgIcNewSearchGray18
            className={styles.searchIcon}
            width={18}
            height={18}
          />
          <input
            className={styles.textSection}
            type="text"
            placeholder={isFocused ? '' : placeholder}
            ref={textInput}
            value={value}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            onFocus={() => {
              setIsFocused(true);
              setShowClearBtn(true);
              onFocus?.();
            }}
            onBlur={() => {
              if (!value) {
                setIsFocused(false);
                setShowClearBtn(false);
              }
            }}
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
