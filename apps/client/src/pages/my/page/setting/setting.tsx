import { Link } from 'react-router-dom';
import SvgIcArrowGray16 from 'node_modules/@confeti/design-system/src/icons/src/IcArrowGray16';

import { Footer, Header } from '@confeti/design-system';
import { routePath } from '@shared/router/path';

import * as styles from './setting.css';

const linkObject = [
  {
    label: '공지사항',
    path: 'https://wonderful-celestite-e3c.notion.site/1fb210e281b0805d86e4f96441eef765?pvs=4',
  },
  {
    label: '개인정보처리방침',
    path: 'https://wonderful-celestite-e3c.notion.site/confeti-1b3210e281b08080b766f48bf18d0be9',
  },
  {
    label: '이용약관',
    path: 'https://wonderful-celestite-e3c.notion.site/confeti-1b4210e281b080e5ad4ad28c651a651a',
  },
];

const Setting = () => {
  return (
    <>
      <Header variant="detail" title="설정"></Header>
      <section className={styles.contentsSection}>
        {linkObject.map((item) => (
          <a
            key={item.path}
            className={styles.navigationLink}
            href={item.path}
            target="_blank"
            rel="noreferrer"
          >
            <p className={styles.linkText}>{item.label}</p>
            <SvgIcArrowGray16 width={'1.6rem'} height={'1.6rem'} />
          </a>
        ))}

        <Link
          to={routePath.MY_DELETE_ACCOUNT}
          className={styles.navigationLink}
        >
          <p className={styles.linkText}>회원탈퇴</p>
          <SvgIcArrowGray16 width={'1.6rem'} height={'1.6rem'} />
        </Link>
      </section>
      <Footer />
    </>
  );
};

export default Setting;
