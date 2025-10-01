import {
  cloneElement,
  createContext,
  isValidElement,
  type ReactNode,
  useContext,
  useState,
} from 'react';

import { cn } from '@confeti/utils';

import * as styles from './tooltip.css';

interface TooltipContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  trigger: 'hover' | 'click' | 'none';
  position: 'top' | 'bottom';
  tailPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  animated: boolean;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

const useTooltipContext = () => {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error(
      'Tooltip components must be used within a Tooltip provider',
    );
  }
  return context;
};

interface TooltipRootProps {
  trigger?: 'hover' | 'click' | 'none';
  position?: 'top' | 'bottom';
  tailPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  animated?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

interface TooltipTriggerProps {
  asChild?: boolean;
  children: ReactNode;
}

interface TooltipContentProps {
  className?: string;
  children: ReactNode;
}

const TooltipRoot = ({
  trigger = 'hover',
  position = 'top',
  tailPosition = 'bottom-right',
  animated = false,
  open: controlledOpen,
  onOpenChange,
  children,
}: TooltipRootProps) => {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setIsOpen = (open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open);
    }
    onOpenChange?.(open);
  };

  return (
    <TooltipContext.Provider
      value={{
        isOpen,
        setIsOpen,
        trigger,
        position,
        tailPosition,
        animated,
      }}
    >
      <div className={styles.tooltipContainer}>{children}</div>
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = ({ asChild = true, children }: TooltipTriggerProps) => {
  const { setIsOpen, trigger } = useTooltipContext();

  const handleTriggerEvent = () => {
    if (trigger === 'click') {
      setIsOpen(true);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      setIsOpen(false);
    }
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
      {
        onClick: handleTriggerEvent,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        style: { cursor: 'pointer' },
      },
    );
  }

  return (
    <span
      onClick={handleTriggerEvent}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </span>
  );
};

const TooltipContent = ({ className, children }: TooltipContentProps) => {
  const { isOpen, trigger, position, tailPosition, animated } =
    useTooltipContext();
  const shouldShow = trigger === 'none' || isOpen;

  if (!shouldShow) {
    return null;
  }

  return (
    <div
      className={cn(
        styles.tooltipBubble({
          position: trigger === 'none' ? undefined : position,
          tailPosition,
          animated,
          trigger: trigger === 'none' ? 'none' : 'interactive',
        }),
        className,
      )}
    >
      {children}
    </div>
  );
};

const Tooltip = Object.assign(TooltipRoot, {
  Trigger: TooltipTrigger,
  Content: TooltipContent,
});

export default Tooltip;
