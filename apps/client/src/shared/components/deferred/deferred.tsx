import { ReactNode, useEffect, useState } from 'react';

interface DeferredProps {
  children: ReactNode;
}

const Deferred = ({ children }: DeferredProps) => {
  const [isDeferred, setIsDeferred] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDeferred(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return isDeferred ? <>{children}</> : null;
};

export default Deferred;
