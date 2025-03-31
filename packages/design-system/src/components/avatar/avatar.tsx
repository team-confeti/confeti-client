import { CmpProfileNon } from '../../icons/src';
import { cn } from '../../utils';

import * as styles from './avatar.css';

interface Props {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

const Avatar = ({ className, src, alt, size, fallback, ...props }: Props) => {
  const renderFallback = !src && !fallback && (
    <CmpProfileNon className={styles.imgVariants()} />
  );

  return (
    <div className={cn(styles.avatarVariants({ size }), className)} {...props}>
      {src ? (
        <img src={src} alt={alt} className={styles.imgVariants()} />
      ) : (
        renderFallback || <span className={styles.fallback()}>{fallback}</span>
      )}
    </div>
  );
};

export default Avatar;
