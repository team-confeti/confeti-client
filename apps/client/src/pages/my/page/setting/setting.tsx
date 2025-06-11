import { Link } from 'react-router-dom';

import { Footer, Header } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';
import { EXTERNAL_LINKS } from '@shared/constants/links';
import { routePath } from '@shared/router/path';

import * as styles from './setting.css';

const Setting = () => {
  return (
    <>
      <Header variant="detail" title="설정" />
      <section className={styles.contentsSection}>
        {EXTERNAL_LINKS.map((item) => (
          <a
            key={item.url}
            className={styles.navigationLink}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className={styles.linkText}>{item.label}</p>
            <Icon name="arrow-horizontal" size="1.6rem" color="gray500" />
          </a>
        ))}
        <Link
          to={routePath.MY_DELETE_ACCOUNT}
          className={styles.navigationLink}
        >
          <p className={styles.linkText}>회원탈퇴</p>
          <Icon name="arrow-horizontal" size="1.6rem" color="gray500" />
        </Link>
      </section>
      <Footer />
    </>
  );
};

export default Setting;
