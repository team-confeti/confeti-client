import { cn } from '@confeti/utils';

import * as styles from './toggle.css';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Toggle = ({ checked, onChange, disabled = false, className }: Props) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <label
      className={cn(
        styles.toggleContainer({
          checked,
          disabled,
        }),
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        className={styles.toggleInput}
        aria-checked={checked}
        role="switch"
      />
      <div
        className={styles.toggleThumb({
          checked,
        })}
      />
    </label>
  );
};

export default Toggle;
