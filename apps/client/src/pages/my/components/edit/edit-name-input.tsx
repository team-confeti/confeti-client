import { useRef, useState } from 'react';
import SvgBtnClose from 'node_modules/@confeti/design-system/src/icons/src/BtnClose';

import { cn } from '@confeti/design-system/utils';

import * as styles from './edit-name-input.css';

interface EditNameInputProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid: boolean;
}

const EditNameInput = ({ name, onChange, isInvalid }: EditNameInputProps) => {
  const textInput = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleFocusBlur = () => setIsFocused((prev) => !prev);

  const handleClear = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    textInput.current?.blur();
  };

  const handleClearMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    handleClear();
  };

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
          onFocus={handleFocusBlur}
          onBlur={handleFocusBlur}
          placeholder={isFocused ? '' : '2~10자로 입력해 주세요'}
          className={cn(
            styles.textSection,
            isInvalid ? styles.textSectionInvalid : undefined,
          )}
        />
        {isFocused && (
          <SvgBtnClose
            className={styles.closeBtn}
            onClick={handleClear}
            onMouseDown={handleClearMouseDown}
            width={'1.8rem'}
            height={'1.8rem'}
          />
        )}
      </div>
    </section>
  );
};

export default EditNameInput;
