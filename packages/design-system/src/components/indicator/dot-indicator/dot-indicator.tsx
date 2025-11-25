import { cn } from '@confeti/utils';

import { dotIndicatorVariants, dotVariants } from './dot-indicator.css';

interface Props {
  total: number;
  current: number;
  className?: string;
  onDotClick?: (index: number) => void;
}

const DotIndicator = ({ total, current, className, onDotClick }: Props) => {
  return (
    <div
      className={cn(dotIndicatorVariants(), className)}
      role="tablist"
      aria-label={`${total}개의 슬라이드`}
    >
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          type="button"
          role="tab"
          aria-label={`${index + 1}번째 항목으로 이동`}
          aria-selected={index === current}
          className={cn(
            dotVariants({
              active: index === current,
            }),
          )}
          onClick={() => onDotClick?.(index)}
        />
      ))}
    </div>
  );
};

export default DotIndicator;
