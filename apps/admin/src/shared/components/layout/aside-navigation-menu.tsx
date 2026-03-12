import {
  LayoutDashboard,
  ListMusic,
  LogOut,
  Music,
  Tent,
  Ticket,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

import { PATH } from '@shared/constants/path';

import ConfetiLogo from './confeti-logo';

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

const SIDEBAR_WIDTH = { expanded: 256, collapsed: 72 };
const LOGO_SIZE = { expanded: 32, collapsed: 24 };

const SPRING_TRANSITION = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
};

const TEXT_VARIANTS = {
  hidden: { opacity: 0, width: 0 },
  visible: { opacity: 1, width: 'auto' },
};

const TWEEN_TRANSITION = {
  duration: 0.2,
  ease: 'easeOut' as const,
};

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
      path: PATH.PENDING,
      icon: <ListMusic size={20} />,
      badge: pendingCount,
    },
    { name: '페스티벌', path: PATH.FESTIVAL, icon: <Tent size={20} /> },
    { name: '콘서트', path: PATH.CONCERT, icon: <Music size={20} /> },
    {
      name: '예매처 관리',
      path: PATH.TICKETING_PLATFORM,
      icon: <Ticket size={20} />,
    },
  ];

  const renderMenuLink = (item: MenuItem) => {
    const { pathname, search } = location;
    let isActive = pathname.startsWith(item.path);

    if (!isActive && pathname.startsWith('/performances/')) {
      const type = new URLSearchParams(search).get('type');
      if (type === 'festival' && item.path === PATH.FESTIVAL) isActive = true;
      if (type === 'concert' && item.path === PATH.CONCERT) isActive = true;
    }

    if (!isActive && pathname.startsWith('/performance-editor/')) {
      if (item.path === '/pending') isActive = true;
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        className={styles.link({ active: isActive })}
        title={!isExpanded ? item.name : ''}
      >
        <div className={styles.iconWrapper}>{item.icon}</div>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.span
              key="text"
              className={styles.linkText}
              variants={TEXT_VARIANTS}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={SPRING_TRANSITION}
            >
              {item.name}
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {isExpanded && item.badge && item.badge > 0 && (
            <motion.span
              key="badge"
              className={styles.badge}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              {item.badge}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    );
  };

  return (
    <motion.aside
      className={styles.container}
      animate={{
        width: isExpanded ? SIDEBAR_WIDTH.expanded : SIDEBAR_WIDTH.collapsed,
      }}
      transition={SPRING_TRANSITION}
    >
      <motion.div
        className={styles.header}
        animate={{ paddingLeft: isExpanded ? 20 : 24 }}
        transition={SPRING_TRANSITION}
      >
        <motion.div
          animate={{
            width: isExpanded ? LOGO_SIZE.expanded : LOGO_SIZE.collapsed,
            height: isExpanded
              ? LOGO_SIZE.expanded * 0.75
              : LOGO_SIZE.collapsed * 0.75,
          }}
          transition={SPRING_TRANSITION}
          style={{ flexShrink: 0 }}
        >
          <ConfetiLogo
            size={isExpanded ? LOGO_SIZE.expanded : LOGO_SIZE.collapsed}
          />
        </motion.div>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="logo-text"
              style={{ overflow: 'hidden', flexShrink: 0 }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={TWEEN_TRANSITION}
            >
              <h1 className={styles.logoText}>CONFETI</h1>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <nav className={styles.nav}>
        <div className={styles.section}>
          {MENU_ITEMS.slice(0, 1).map(renderMenuLink)}
        </div>

        <div className={styles.section}>
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="section-title-performances"
                className={styles.sectionTitle}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 40 }}
                exit={{ opacity: 0, height: 0 }}
                transition={SPRING_TRANSITION}
              >
                공연 관리
              </motion.div>
            )}
          </AnimatePresence>
          {MENU_ITEMS.slice(1, 4).map(renderMenuLink)}
        </div>

        <div className={styles.section}>
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="section-title-system"
                className={styles.sectionTitle}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 40 }}
                exit={{ opacity: 0, height: 0 }}
                transition={SPRING_TRANSITION}
              >
                시스템 관리
              </motion.div>
            )}
          </AnimatePresence>
          {MENU_ITEMS.slice(4).map(renderMenuLink)}
        </div>
      </nav>

      <div className={styles.footer}>
        <button className={styles.logoutButton}>
          <LogOut size={20} />
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.span
                key="logout-text"
                variants={TEXT_VARIANTS}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={TWEEN_TRANSITION}
              >
                로그아웃
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
};

export default AsideNavigationMenu;
