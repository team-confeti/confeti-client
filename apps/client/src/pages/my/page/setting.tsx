import { Footer, Header } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';

import Link from '../components/navigation/link';

import * as styles from './setting.css';

const linkObject = [
  { label: '공지사항', path: '/notice' },
  { label: '개인정보처리방침', path: routePath.PRIVACY_PERSONAL },
  { label: '이용약관', path: routePath.PRIVACY_CONFETI },
  { label: '회원탈퇴', path: routePath.MY_DELETE_ACCOUNT },
];

const Setting = () => {
  return (
    <>
      <Header variant="detail" title="설정"></Header>
      <section className={styles.contentsSection}>
        {linkObject.map((item) => (
          <Link key={item.path} label={item.label} path={item.path} />
        ))}
      </section>
      <Footer />
    </>
  );
};

export default Setting;
