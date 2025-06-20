import { useRef, useState } from 'react';

import { Icon } from '../../icons';

import * as styles from './search-bar.css';

interface SearchBarProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  showBackButton?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchBar = ({
  value,
  onChange,
  onKeyDown,
  onKeyUp,
  onFocus,
  onBlur,
  onClear,
  showBackButton = true,
  placeholder,
  autoFocus = false,
}: SearchBarProps) => {
  const textInput = useRef<HTMLInputElement>(null);
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const updateFocusState = (focused: boolean, showClear: boolean) => {
    setIsFocused(focused);
    setShowClearBtn(showClear);
  };

  const handleClear = () => {
    if (textInput.current) {
      textInput.current.value = '';
      textInput.current.focus();
      updateFocusState(false, false);
      if (onChange) {
        onChange({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      }
      onClear?.();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowClearBtn(e.target.value.length > 0);
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = () => {
    updateFocusState(true, true);
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    if (!value) {
      updateFocusState(false, false);
    }
    if (onBlur) {
      onBlur();
      setIsFocused(false);
    }
  };

  return (
    <>
      {showBackButton && (
        <Icon
          name="arrow-back"
          size="2.2rem"
          onClick={() => window.history.back()}
          className={styles.arrowButton}
        />
      )}
      <div className={styles.searchBar({ type: 'default' })}>
        <Icon
          name="search"
          size="1.8rem"
          color="gray500"
          className={styles.searchIcon}
        />
        <input
          className={styles.textSection}
          type="text"
          placeholder={isFocused ? '' : placeholder}
          ref={textInput}
          value={value}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={autoFocus}
        />
        {showClearBtn && (
          <Icon
            name="clear"
            size="1.8rem"
            color="gray400"
            onClick={handleClear}
          />
        )}
      </div>
    </>
  );
};

export default SearchBar;
