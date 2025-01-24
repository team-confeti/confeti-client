import { ReactNode } from 'react';

interface WrapProps {
  children: ReactNode;
}

const Wrap = ({ children }: WrapProps) => {
  return <section>{children}</section>;
};

export default Wrap;
