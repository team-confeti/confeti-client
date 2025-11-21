import { Icon } from '@confeti/design-system/icon';

import * as styles from './add-music-button.css';

const AddMusicButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={styles.addMusicWrapper} onClick={onClick}>
      <div className={styles.addIconBox}>
        <Icon name="add" size="3rem" color="white" />
      </div>
      <span className={styles.addText}>음악 추가하기</span>
    </button>
  );
};

export default AddMusicButton;
