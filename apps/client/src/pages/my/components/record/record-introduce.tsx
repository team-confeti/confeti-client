import { Avatar } from '@confeti/design-system';

import * as styles from './record-introduce.css.ts';

interface Props {
  name: string;
  profileUrl: string;
}

const RecordIntroduce = ({ name, profileUrl }: Props) => {
  const USER_POSTFIX = '님의' as const;

  return (
    <section className={styles.wrapper}>
      <Avatar
        src={profileUrl}
        alt={`${name}의 프로필 이미지`}
        size="xl"
        isHandleClick={false}
      />

      <div className={styles.info}>
        <div className={styles.sectionWrapper}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>{name}</h2>
            <p className={styles.description}>{USER_POSTFIX}</p>
          </div>
          <h1 className={styles.description}>콘페티 기록을 보여드려요!</h1>
        </div>
      </div>
    </section>
  );
};

export default RecordIntroduce;
