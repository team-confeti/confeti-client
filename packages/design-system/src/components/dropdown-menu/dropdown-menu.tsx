import {
  ButtonHTMLAttributes,
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';

import useClickOutside from '../../hooks/use-click-outside';
import { cn } from '../../utils';

import * as styles from './dropdown-menu.css';

interface DropdownContextProps {
  open: boolean;
  handleToggleOpen: () => void;
  handleToggleClose: () => void;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

// useDropdownContext: 드롭다운 컴포넌트 외부에서 서브 컴포넌트들이 사용됐을 때 에러 처리
const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown 컴포넌트는 Dropdown 내에서 사용되어야 합니다.');
  }
  return context;
};

interface DropdownRootProps {
  children: ReactNode;
  className?: string;
}

const DropdownRoot = ({ className, children }: DropdownRootProps) => {
  const [open, setOpen] = useState(false);

  const handleToggleOpen = () => setOpen((prev) => !prev);
  const handleClose = () => setOpen(false);

  const ref = useRef<HTMLInputElement>(null);
  useClickOutside(ref, handleClose);

  const contextValue: DropdownContextProps = {
    open,
    handleToggleOpen,
    handleToggleClose: handleClose,
  };

  return (
    <DropdownContext.Provider value={contextValue}>
      <div ref={ref} className={cn(styles.dropdownWrapper, className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

// Dropdown의 메뉴를 trigger 하는 컴포넌트
interface DropdownTriggerProps {
  children: ReactNode | (({ open }: { open: boolean }) => ReactNode);
  className?: string;
  onClick?: () => void;
}

const DropdownTrigger = ({
  children,
  className,
  onClick,
}: DropdownTriggerProps) => {
  const { handleToggleOpen, open } = useDropdownContext();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggleOpen();
        onClick?.();
      }}
      className={cn(styles.triggerBtnStyle({ isToggleOpen: open }), className)}
    >
      {typeof children === 'function' ? children({ open }) : children}
    </button>
  );
};

// Dropdown의 메뉴 리스트를 렌더링하는 컴포넌트
interface DropdownContentProps {
  children: ReactNode;
  className?: string;
}

const DropdownContent = ({ children, className }: DropdownContentProps) => {
  const { open, handleToggleClose } = useDropdownContext();

  return (
    <ul
      onClick={handleToggleClose}
      className={cn(styles.dropdownContent({ isToggleOpen: open }), className)}
    >
      {open && children}
    </ul>
  );
};

// Dropdown의 메뉴 리스트 아이템 컴포넌트
interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const DropdownItem = ({
  label,
  children,
  className,
  onClick,
  ...props
}: DropdownItemProps) => {
  return (
    <li>
      <button
        {...props}
        onClick={onClick}
        className={cn(styles.dropdownItem, className)}
      >
        {children}
        <p>{label}</p>
      </button>
    </li>
  );
};

const DropdownMenu = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
});

export default DropdownMenu;
