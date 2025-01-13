import * as styles from './navigation.css';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavContextProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const NavContext = createContext<NavContextProps | undefined>(undefined);

interface NavProps {
  children: ReactNode;
  defaultActiveTab?: number;
}

const useTabContext = (): NavContextProps => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error(
      'Navigation의 모든 하위 컴포넌트는 Navigation.Root 내에서 사용되어야 합니다.',
    );
  }
  return context;
};

const NavRoot = ({ children, defaultActiveTab = 0 }: NavProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  return (
    <NavContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={styles.box}>{children}</div>
    </NavContext.Provider>
  );
};

interface ListProps {
  children: ReactNode;
  activeTab?: number;
}

const NavList = ({ children, activeTab }: ListProps) => {
  return (
    <div className={styles.container}>
      {children}
      <div className={styles.underBar}>
        <div
          className={styles.bar}
          style={{ left: activeTab === 0 ? '1.4rem' : '2rem' }}
        />
      </div>
    </div>
  );
};

interface ItemProps {
  index: number;
  children: ReactNode;
}

const NavItem = ({ index, children }: ItemProps) => {
  const { activeTab, setActiveTab } = useTabContext();
  return (
    <button
      className={styles.list({ active: activeTab === index })}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};

const NavPanels = ({ children }: { children: ReactNode }) => {
  const { activeTab } = useTabContext();
  const childrenArray = React.Children.toArray(children);
  return <div>{childrenArray[activeTab]}</div>;
};

const NavPanel = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

const Navigation = {
  Root: NavRoot,
  List: NavList,
  Item: NavItem,
  Panels: NavPanels,
  Panel: NavPanel,
};

export default Navigation;
