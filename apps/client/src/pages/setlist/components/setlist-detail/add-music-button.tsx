import { Icon } from '@confeti/design-system/icon';

import { LogClickEvent } from '@shared/analytics/logging';

import * as styles from './add-music-button.css';

const AddMusicButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <LogClickEvent name="click_setlist_detail_add_music">
      <button className={styles.addMusicWrapper} onClick={onClick}>
        <div className={styles.addIconBox}>
          <Icon name="add" size="3rem" color="white" />
        </div>
        <span className={styles.addText}>음악 추가하기</span>
      </button>
    </LogClickEvent>
  );
};

export default AddMusicButton;
