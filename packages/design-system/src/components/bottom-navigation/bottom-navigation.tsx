import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as styles from './bottom-navigation.css';

type ActivationMode = 'automatic' | 'manual';

interface BottomNavigationContextValue {
  value: string;
  setValue: (next: string) => void;
  activationMode: ActivationMode;
  registerItem: (value: string, el: HTMLElement | null) => void;
  moveFocus: (
    direction: 'prev' | 'next' | 'first' | 'last',
    currentValue: string,
  ) => void;
  isTabStop: (value: string) => boolean;
}

const BottomNavigationContext = createContext<
  BottomNavigationContextValue | undefined
>(undefined);

const useBottomNavigation = (): BottomNavigationContextValue => {
  const context = useContext(BottomNavigationContext);
  if (!context) {
    throw new Error(
      'BottomNavigation의 모든 하위 컴포넌트는 BottomNavigation.Root 내에서 사용되어야 합니다.',
    );
  }
  return context;
};

interface RootProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (next: string) => void;
  ariaLabel: string;
  activationMode?: ActivationMode;
  className?: string;
}

const Root = ({
  children,
  value,
  defaultValue,
  onValueChange,
  ariaLabel,
  activationMode = 'automatic',
  className,
}: RootProps) => {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string>(defaultValue ?? '');
  const current = isControlled ? value : internal;

  const itemsRef = useRef<Map<string, HTMLElement>>(new Map());
  const [order, setOrder] = useState<string[]>([]);

  const setValue = useCallback(
    (next: string) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const registerItem = useCallback((key: string, el: HTMLElement | null) => {
    if (el) {
      itemsRef.current.set(key, el);
      setOrder((prev) => (prev.includes(key) ? prev : [...prev, key]));
    } else {
      itemsRef.current.delete(key);
      setOrder((prev) => prev.filter((registered) => registered !== key));
    }
  }, []);

  const moveFocus = useCallback(
    (direction: 'prev' | 'next' | 'first' | 'last', currentValue: string) => {
      if (order.length === 0) return;
      const idx = order.indexOf(currentValue);
      const safeIdx = idx === -1 ? 0 : idx;
      const targetIndex =
        direction === 'first'
          ? 0
          : direction === 'last'
            ? order.length - 1
            : direction === 'prev'
              ? (safeIdx - 1 + order.length) % order.length
              : (safeIdx + 1) % order.length;
      const targetKey = order[targetIndex];
      if (targetKey === undefined) return;
      const el = itemsRef.current.get(targetKey);
      el?.focus();
      if (activationMode === 'automatic') {
        setValue(targetKey);
      }
    },
    [order, activationMode, setValue],
  );

  // active 탭이 없으면(예: 매칭 안 되는 경로) 첫 탭을 키보드 진입점(tabIndex 0)으로 둔다.
  const hasActiveItem = order.includes(current);
  const isTabStop = useCallback(
    (itemValue: string) =>
      itemValue === current || (!hasActiveItem && itemValue === order[0]),
    [current, hasActiveItem, order],
  );

  const contextValue = useMemo<BottomNavigationContextValue>(
    () => ({
      value: current,
      setValue,
      activationMode,
      registerItem,
      moveFocus,
      isTabStop,
    }),
    [current, setValue, activationMode, registerItem, moveFocus, isTabStop],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        moveFocus('prev', current);
        break;
      case 'ArrowRight':
        event.preventDefault();
        moveFocus('next', current);
        break;
      case 'Home':
        event.preventDefault();
        moveFocus('first', current);
        break;
      case 'End':
        event.preventDefault();
        moveFocus('last', current);
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigationContext.Provider value={contextValue}>
      <nav
        aria-label={ariaLabel}
        className={[styles.root, className].filter(Boolean).join(' ')}
      >
        <div role="tablist" className={styles.list} onKeyDown={onKeyDown}>
          {children}
        </div>
      </nav>
    </BottomNavigationContext.Provider>
  );
};
Root.displayName = 'BottomNavigation.Root';

interface ItemRenderProps {
  isActive: boolean;
}

interface ItemProps {
  value: string;
  label: string;
  visuallyHiddenLabel?: boolean;
  asChild?: boolean;
  onSelect?: () => void;
  className?: string;
  children?: ReactNode | ((props: ItemRenderProps) => ReactNode);
}

const Item = ({
  value,
  label,
  visuallyHiddenLabel = false,
  asChild = false,
  onSelect,
  className,
  children,
}: ItemProps) => {
  const {
    value: current,
    setValue,
    registerItem,
    isTabStop,
  } = useBottomNavigation();
  const isActive = current === value;
  const tabbable = isTabStop(value);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(
    function registerItemRefInRoot() {
      registerItem(value, elementRef.current);
      return () => registerItem(value, null);
    },
    [value, registerItem],
  );

  const setRef = useCallback((el: HTMLElement | null) => {
    elementRef.current = el;
  }, []);

  const activate = useCallback(() => {
    setValue(value);
    onSelect?.();
  }, [value, setValue, onSelect]);

  const sharedClassName = [
    styles.item({ state: isActive ? 'active' : 'inactive' }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const labelClassName = visuallyHiddenLabel
    ? styles.visuallyHidden
    : styles.label;

  const renderedChildren =
    typeof children === 'function' ? children({ isActive }) : children;

  const labelNode = <span className={labelClassName}>{label}</span>;

  if (asChild) {
    if (!isValidElement(renderedChildren)) {
      throw new Error(
        'BottomNavigation.Item asChild는 단일 React element를 자식으로 받아야 합니다.',
      );
    }
    const onlyChild = Children.only(renderedChildren) as ReactElement<
      Record<string, unknown> & {
        children?: ReactNode;
        onClick?: (event: MouseEvent<HTMLElement>) => void;
        className?: string;
        ref?: Ref<HTMLElement>;
      }
    >;
    const childOnClick = onlyChild.props.onClick;
    const childClassName = onlyChild.props.className;

    return cloneElement(onlyChild, {
      ref: setRef,
      role: 'tab',
      'aria-selected': isActive,
      'aria-current': isActive ? 'page' : undefined,
      'data-state': isActive ? 'active' : 'inactive',
      tabIndex: tabbable ? 0 : -1,
      className: [sharedClassName, childClassName].filter(Boolean).join(' '),
      onClick: (event: MouseEvent<HTMLElement>) => {
        childOnClick?.(event);
        if (!event.defaultPrevented) activate();
      },
      children: (
        <>
          {onlyChild.props.children}
          {labelNode}
        </>
      ),
    });
  }

  return (
    <button
      ref={setRef}
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-current={isActive ? 'page' : undefined}
      data-state={isActive ? 'active' : 'inactive'}
      tabIndex={tabbable ? 0 : -1}
      className={sharedClassName}
      onClick={activate}
    >
      {renderedChildren}
      {labelNode}
    </button>
  );
};
Item.displayName = 'BottomNavigation.Item';

const BottomNavigation = {
  Root,
  Item,
};

export default BottomNavigation;
