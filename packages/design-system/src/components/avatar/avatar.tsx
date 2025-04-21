import { useState } from 'react';

import { CmpProfileNon } from '../../icons/src';
import { IcSelect } from '../../icons/src';
import { cn } from '../../utils';

import * as styles from './avatar.css';

interface Props {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  isSelected?: boolean;
}

const Avatar = ({
  className,
  src,
  alt,
  size,
  fallback,
  isSelected = false,
  ...props
}: Props) => {
  const [internalSelected, setInternalSelected] = useState(isSelected);

  const handleClick = () => {
    setInternalSelected((prev) => !prev);
  };

  const renderFallback = !src && !fallback && (
    <CmpProfileNon className={styles.imgVariants()} />
  );

  return (
    <div
      className={cn(styles.avatarVariants({ size }), className)}
      {...props}
      onClick={handleClick}
    >
      {src ? (
        <img src={src} alt={alt} className={styles.imgVariants()} />
      ) : (
        renderFallback || <span className={styles.fallback()}>{fallback}</span>
      )}
      {internalSelected && (
        <div className={styles.overlay}>
          <IcSelect className={styles.icon} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
