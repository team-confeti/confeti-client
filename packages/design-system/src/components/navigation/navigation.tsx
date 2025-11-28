import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from 'react';

import * as styles from './navigation.css';

type NavigationTheme = 'transparent' | 'white';

interface NavContextProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
  theme: NavigationTheme;
}

const NavContext = createContext<NavContextProps | undefined>(undefined);

const useTabContext = (): NavContextProps => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error(
      'Navigation의 모든 하위 컴포넌트는 Navigation.Root 내에서 사용되어야 합니다.',
    );
  }
  return context;
};

interface NavProps {
  children: ReactNode;
  defaultActiveTab?: number;
  theme?: NavigationTheme;
}

const NavRoot = ({
  children,
  defaultActiveTab = 0,
  theme = 'white',
}: NavProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  return (
    <NavContext.Provider value={{ activeTab, setActiveTab, theme }}>
      <div className={styles.box}>{children}</div>
    </NavContext.Provider>
  );
};

const NavList = ({ children }: { children: ReactNode }) => {
  const { theme } = useTabContext();
  return <div className={styles.container({ theme })}>{children}</div>;
};

interface ItemProps {
  index: number;
  children: ReactNode;
  handleTabClick: () => void;
}

const NavItem = ({ index, children, handleTabClick }: ItemProps) => {
  const { activeTab, setActiveTab, theme } = useTabContext();

  return (
    <button
      key={activeTab}
      className={styles.list({ active: activeTab === index, theme })}
      onClick={() => {
        setActiveTab(index);
        handleTabClick();
      }}
    >
      {children}
      <div
        className={
          activeTab === index
            ? styles.underBar({ theme })
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
