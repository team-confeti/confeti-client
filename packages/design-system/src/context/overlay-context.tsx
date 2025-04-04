import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

type OverlayProps = {
  isOpen: boolean;
  close: (result?: unknown) => void;
};

type ContentCallback = (props: OverlayProps) => ReactNode;

type OverlayContextValue = {
  open: (contentCallback: ContentCallback) => void;
  close: (result?: unknown) => void;
};

// 오버레이 컨텍스트 생성
const OverlayContext = createContext<OverlayContextValue | null>(null);

type ProviderProps = {
  children: ReactNode;
};

// 오버레이 제공자 컴포넌트
export const OverlayProvider = ({ children }: ProviderProps) => {
  // 현재 열린 오버레이 상태를 저장
  const [overlayContent, setOverlayContent] = useState<ContentCallback | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  // 오버레이 열기 함수
  const open = useCallback((contentCallback: ContentCallback) => {
    setOverlayContent(() => contentCallback);
    setIsOpen(true);
  }, []);

  // 오버레이 닫기 함수
  const close = useCallback((result?: unknown) => {
    setIsOpen(false);
    setOverlayContent(null);
  }, []);

  const value: OverlayContextValue = {
    open,
    close,
  };

  return (
    <OverlayContext.Provider value={value}>
      {children}
      {overlayContent &&
        overlayContent({
          isOpen,
          close,
        })}
    </OverlayContext.Provider>
  );
};

// 오버레이 커스텀 훅
export const useOverlay = (): OverlayContextValue => {
  const context = useContext(OverlayContext);

  if (context === null) {
    throw new Error(
      'useOverlay는 반드시 OverlayProvider 내에서 사용되어야 합니다.',
    );
  }

  return context;
};
