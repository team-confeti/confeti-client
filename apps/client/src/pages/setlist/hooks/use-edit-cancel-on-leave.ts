import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useEditCancelOnLeave = (
  isEditMode: boolean,
  cancelEdit: () => void,
) => {
  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEditMode) {
        cancelEdit();
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEditMode, cancelEdit]);

  useEffect(() => {
    if (isEditMode && location.pathname !== prevPathnameRef.current) {
      cancelEdit();
    }
    prevPathnameRef.current = location.pathname;
  }, [location.pathname, isEditMode, cancelEdit]);
};
