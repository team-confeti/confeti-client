import {
  LayoutDashboard,
  ListMusic,
  LogOut,
  Music,
  Tent,
  Ticket,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { PATH } from '@shared/constants/path';

import * as styles from './aside-navigation-menu.css';

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
}

interface Props {
  isExpanded: boolean;
  pendingCount?: number;
}

const AsideNavigationMenu = ({ isExpanded, pendingCount = 0 }: Props) => {
  const location = useLocation();

  const MENU_ITEMS: MenuItem[] = [
    {
      name: '대시보드',
      path: PATH.DASHBOARD,
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: '대기 목록',
      path: '/pending',
      icon: <ListMusic size={20} />,
      badge: pendingCount,
    },
    { name: '페스티벌', path: PATH.FESTIVAL, icon: <Tent size={20} /> },
    { name: '콘서트', path: PATH.CONCERT, icon: <Music size={20} /> },
    { name: '예매처 관리', path: '/agency', icon: <Ticket size={20} /> },
  ];

  return (
    <aside
      className={`${styles.container} ${isExpanded ? styles.expanded : styles.collapsed}`}
    >
      <div className={styles.header}>
        {isExpanded ? (
          <h1 className={styles.logo}>CONFETI</h1>
        ) : (
          <h1 className={styles.logoCollapsed}>C</h1>
        )}
      </div>

      <nav className={styles.nav}>
        <div className={styles.section}>
          {MENU_ITEMS.slice(0, 1).map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                title={!isExpanded ? item.name : ''}
              >
                <div className={styles.iconWrapper}>{item.icon}</div>
                {isExpanded && (
                  <span className={styles.linkText}>{item.name}</span>
                )}
              </Link>
            );
          })}
        </div>

        <div className={styles.section}>
          {isExpanded && <div className={styles.sectionTitle}>공연 관리</div>}
          {MENU_ITEMS.slice(1, 4).map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                title={!isExpanded ? item.name : ''}
              >
                <div className={styles.iconWrapper}>{item.icon}</div>
                {isExpanded && (
                  <>
                    <span className={styles.linkText}>{item.name}</span>
                    {item.badge && item.badge > 0 && (
                      <span className={styles.badge}>{item.badge}</span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>

        <div className={styles.section}>
          {isExpanded && <div className={styles.sectionTitle}>시스템 관리</div>}
          {MENU_ITEMS.slice(4).map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
                title={!isExpanded ? item.name : ''}
              >
                <div className={styles.iconWrapper}>{item.icon}</div>
                {isExpanded && (
                  <span className={styles.linkText}>{item.name}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className={styles.footer}>
        <button className={styles.logoutButton}>
          <LogOut size={20} />
          {isExpanded && <span>로그아웃</span>}
        </button>
      </div>
    </aside>
  );
};

export default AsideNavigationMenu;
