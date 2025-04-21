import { useRef, useState } from 'react';
import SvgBtnClose from 'node_modules/@confeti/design-system/src/icons/src/BtnClose';

import { cn } from '@confeti/design-system/utils';

import * as styles from './edit-name.css';

interface EditNameProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
}

const EditName = ({ name, onChange, isInvalid }: EditNameProps) => {
  const textInput = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleClear = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
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
      <div
        className={cn(
          styles.inputWrapper,
          isInvalid ? styles.inputWrapperError : undefined,
        )}
      >
        <input
          ref={textInput}
          type="text"
          value={name}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFocused ? '' : '2~10자로 입력해 주세요'}
          className={cn(
            styles.textSection,
            isInvalid ? styles.textSectionInvalid : undefined,
          )}
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
