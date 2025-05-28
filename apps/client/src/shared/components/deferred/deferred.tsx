import { ReactNode, useEffect, useState } from 'react';

interface DeferredProps {
  children: ReactNode;
}

const Deferred = ({ children }: DeferredProps) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDeferred(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (!isDeferred) {
    return null;
  }
  return <>{children}</>;
};

export default Deferred;
