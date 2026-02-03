import NavigationTabs from '@shared/components/navigation-tabs';

import { TAB_MENU } from '@pages/home/constants/tab';

import * as styles from './maintenance-page.css';

import ImgSetlistMaintenance from '/images/img_setlist_maintenance.webp';

const MaintenancePage = () => {
  return (
    <>
      <NavigationTabs defaultActiveTab={TAB_MENU.MY_HISTORY} />
      <div className={styles.container}>
        <img
          className={styles.image}
          src={ImgSetlistMaintenance}
          alt="maintenance"
        />
        <h1 className={styles.title}>서비스 준비중이에요!</h1>
        <p className={styles.description}>
          곧 오픈될 예정이에요.
          <br />
          홈으로 돌아가서 다른 서비스를 이용해 보세요.
        </p>
      </div>
    </>
  );
};

export default MaintenancePage;
