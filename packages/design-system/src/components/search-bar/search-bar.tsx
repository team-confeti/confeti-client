import * as styles from './search-bar.css';
import SvgIcSicGray18 from '../../icons/src/IcSicGray18';
import SvgBtnArrowLeft20 from '../../icons/src/BtnArrowLeft20';
import SvgBtnClose from '../../icons/src/BtnClose';
import { useRef } from 'react';

export const SearchBar = () => {
  const textInput = useRef<HTMLInputElement>(null);
  const closeButton = useRef<SVGSVGElement>(null);

  const handleFocus = () => {
    if (textInput.current && closeButton.current) {
      textInput.current.placeholder = '';
      closeButton.current.style.display = 'flex';
    }
  };

  const handleBlur = () => {
    if (closeButton.current) {
      closeButton.current.style.display = 'none';
    }
  };

  const handleClear = () => {
    if (textInput.current) {
      textInput.current.value = '';
      textInput.current.focus();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <SvgBtnArrowLeft20 width={20} height={20} />
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
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></input>
          <SvgBtnClose
            ref={closeButton}
            onClick={handleClear}
            width={18}
            height={18}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};
