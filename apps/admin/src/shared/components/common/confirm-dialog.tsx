import { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

import * as styles from './confirm-dialog.css';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  risk?: 'low' | 'medium' | 'high';
}

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onCancel,
  risk = 'medium',
}: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => cancelRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const iconClass =
    risk === 'high'
      ? styles.iconHigh
      : risk === 'medium'
        ? styles.iconMedium
        : styles.iconLow;

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div
        className={styles.dialog}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
      >
        <div className={styles.header}>
          <div className={iconClass}>
            <AlertTriangle size={20} />
          </div>
          <h2 id="confirm-dialog-title" className={styles.title}>
            {title}
          </h2>
          <button className={styles.closeButton} onClick={onCancel}>
            <X size={18} />
          </button>
        </div>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button
            ref={cancelRef}
            className={styles.cancelButton}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            className={
              risk === 'high'
                ? styles.confirmButtonDanger
                : styles.confirmButton
            }
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
