import { IcAdd } from '@confeti/design-system/icons';

import * as styles from './add-music-button.css';

const AddMusicButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={styles.addMusicWrapper} onClick={onClick}>
      <div className={styles.addIconBox}>
        <IcAdd width="30" height="30" />
      </div>
      <span className={styles.addText}>음악 추가하기</span>
    </button>
  );
};

export default AddMusicButton;
