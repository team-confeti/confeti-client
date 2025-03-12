import { useEffect, useState } from 'react';
import { ToastEvent, ToastPosition, ToastProps } from '../types';
import { eventManager } from '../utils/eventManager';
import { TOAST_DEFAULT_POSITION } from '../utils/constants';

const useToastContainer = () => {
  const [toastList, setToastList] = useState(new Map<string, ToastProps>());

  const addToast = (props: ToastProps) => {
    setToastList((prev) => {
      const newMap = new Map(prev);
      newMap.set(props.toastId, props);
      return newMap;
    });
  };

  const deleteToast = (id: string) => {
    setToastList((prev) => {
      if (!prev.has(id)) return prev;

      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  const updateToast = (id: string, text: string) => {
    setToastList((prev) => {
      if (!prev.has(id)) return prev;

      const newMap = new Map(prev);
      const toast = prev.get(id)!;
      newMap.set(id, { ...toast, text });
      return newMap;
    });
  };

  useEffect(() => {
    eventManager.on(ToastEvent.Add, addToast);
    eventManager.on(ToastEvent.Delete, deleteToast);
    eventManager.on(ToastEvent.Update, updateToast);

    return () => {
      eventManager.off(ToastEvent.Add, addToast);
      eventManager.off(ToastEvent.Delete, deleteToast);
      eventManager.off(ToastEvent.Update, updateToast);

      eventManager.cancelEmit(ToastEvent.Add);
      eventManager.cancelEmit(ToastEvent.Delete);
      eventManager.cancelEmit(ToastEvent.Update);
    };
  }, [addToast, deleteToast, updateToast]);

  const getToastPositionGroupToRender = () => {
    const positionGroup = new Map<ToastPosition, ToastProps[]>();

    toastList.forEach((toast) => {
      const position = toast.position || TOAST_DEFAULT_POSITION;

      if (!positionGroup.has(position)) {
        positionGroup.set(position, []);
      }
      positionGroup.get(position)!.push(toast);
    });

    return positionGroup;
  };

  return { getToastPositionGroupToRender };
};

export default useToastContainer;
