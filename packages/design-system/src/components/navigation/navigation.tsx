import React, { createContext, ReactNode, useContext, useState } from 'react';

import * as styles from './navigation.css';

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

const NavList = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

interface ItemProps {
  index: number;
  children: ReactNode;
  handleTabClick: () => void;
}

const NavItem = ({ index, children, handleTabClick }: ItemProps) => {
  const { activeTab, setActiveTab } = useTabContext();

  return (
    <button
      key={activeTab}
      className={styles.list({ active: activeTab === index })}
      onClick={() => {
        setActiveTab(index);
        handleTabClick();
      }}
    >
      {children}
      <div
        className={
          activeTab === index
            ? styles.underBar
            : index === 0
              ? styles.activeUnderBar
              : styles.secondTabUnderBar
        }
      />
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
