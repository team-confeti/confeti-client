import { Link } from 'react-router-dom';

import { Icon } from '@confeti/design-system/icon';

import { LogClickEvent, LogShowEvent } from '@shared/analytics/logging';
import { DetailHeader, Footer } from '@shared/components';
import { EXTERNAL_LINKS } from '@shared/constants/links';
import { routePath } from '@shared/router/path';

import * as styles from './setting.css';

const Setting = () => {
  return (
    <div className={styles.pageWrapper}>
      <LogShowEvent name="show_my_setting" />
      <DetailHeader title="설정" />
      <section className={styles.contentsSection}>
        {EXTERNAL_LINKS.map((item) => (
          <LogClickEvent
            key={item.url}
            name="click_setting_external_link"
            params={{ entry_point: item.label }}
          >
            <a
              className={styles.navigationLink}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className={styles.linkText}>{item.label}</p>
              <Icon name="arrow-horizontal" size="1.6rem" color="gray500" />
            </a>
          </LogClickEvent>
        ))}
        <LogClickEvent name="click_setting_delete_account">
          <Link
            to={routePath.MY_DELETE_ACCOUNT}
            className={styles.navigationLink}
          >
            <p className={styles.linkText}>회원탈퇴</p>
            <Icon name="arrow-horizontal" size="1.6rem" color="gray500" />
          </Link>
        </LogClickEvent>
      </section>
      <Footer />
    </div>
  );
};

export default Setting;
