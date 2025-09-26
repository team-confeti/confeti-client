import { cn } from '@confeti/utils';

import { numberIndicatorVariants } from './number-indicator.css';

interface Props {
  total: number;
  current: number;
  className?: string;
}

const NumberIndicator = ({ total, current, className }: Props) => {
  return (
    <div
      className={cn(numberIndicatorVariants(), className)}
      role="status"
      aria-live="polite"
      aria-label={`${total}개의 슬라이드 중 ${current + 1}번째`}
    >
      <span aria-hidden="true">
        {Math.min(current + 1, total)} / {total}
      </span>
    </div>
  );
};

export default NumberIndicator;
