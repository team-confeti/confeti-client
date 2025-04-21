import { useRef, useState } from 'react';
import SvgBtnClose from 'node_modules/@confeti/design-system/src/icons/src/BtnClose';

import * as styles from './edit-name.css';

const EditName = () => {
  const textInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleClear = () => {
    setName('');
    textInput.current?.focus();
  };

  const handleClearMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    handleClear();
  };
  const showClearBtn = isFocused;

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>이름</h3>
      <div className={styles.inputWrapper}>
        <input
          ref={textInput}
          type="text"
          value={name}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFocused ? '' : '2~10자로 입력해 주세요'}
          className={styles.textSection}
        />
        {showClearBtn && (
          <SvgBtnClose
            className={styles.closeBtn}
            onClick={handleClear}
            onMouseDown={handleClearMouseDown}
            width={18}
            height={18}
          />
        )}
      </div>
    </section>
  );
};

export default EditName;
