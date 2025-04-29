import { Button, Header } from '@confeti/design-system';

import * as styles from './confirm-add-section.css';

const ConfirmAddSection = () => {
  const totalNum = 6;
  return (
    <div>
      <Header variant="detail" title="" className={styles.headerContainer} />
      <div className={styles.textContainer}>
        <p className={styles.totalNumText}>총 {totalNum}곡</p>
        <p className={styles.confirmText}>선택하신 곡 목록이 맞나요?</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button text="셋리스트에 추가하기" />
      </div>
    </div>
  );
};

export default ConfirmAddSection;
