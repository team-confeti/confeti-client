import { useState } from 'react';

import { cn } from '@confeti/utils';

import { Icon } from '../../icons';

import * as styles from './avatar.css';

interface Props {
  size: 'xs' | 'sesm' | 'sm' | 'md' | 'lg' | 'xl';
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
  isSelected?: boolean;
  isHandleClick?: boolean;
  onClick?: () => void;
}

const Avatar = ({
  className,
  src,
  alt,
  size,
  fallback,
  isSelected = false,
  isHandleClick = true,
  onClick,
  ...props
}: Props) => {
  const [internalSelected, setInternalSelected] = useState(isSelected);

  const handleClick = () => {
    if (isHandleClick) {
      setInternalSelected((prev) => !prev);
    }
    onClick?.();
  };

  const renderFallback = !src && !fallback && (
    <Icon
      name="logo-thumbnail"
      className={styles.imgVariants({ isClickable: isHandleClick })}
      style={
        {
          '--icon-bg': '#FFFFFF',
          '--icon-fg': '#EFF0F4',
        } as React.CSSProperties
      }
    />
  );

  return (
    <div
      className={cn(styles.avatarVariants({ size }), className)}
      {...props}
      onClick={handleClick}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={styles.imgVariants({ isClickable: isHandleClick })}
        />
      ) : (
        renderFallback || <span className={styles.fallback()}>{fallback}</span>
      )}
      {internalSelected && isHandleClick && (
        <div className={styles.overlay}>
          <Icon name="select" size="2.8rem" color="confeti_lime" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
