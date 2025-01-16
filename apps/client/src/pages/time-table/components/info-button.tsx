import { ReactNode } from 'react';
import { cn } from '@confeti/design-system/utils';
import { containerVariants } from './info-button.css';
interface InfoButtonContainerProps {
  festivals: {
    festivalId: number;
    title: string;
    posterUrl: string;
  };
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}
interface InfoButtonImageProps {
  images: string[];
  festivalDateId: number;
  size?: 'sm' | 'md' | 'lg';
}

const InfoButtonContainer = ({
  children,
  size = 'md',
}: InfoButtonContainerProps) => (
  <>
    <section className={cn(containerVariants({ size: size }))}>
      {children}
    </section>
  </>
);

const InfoButtonImage = ({
  festivalDateId,
  images,
  size = 'md',
}: InfoButtonImageProps) => {
  return <div>{images}</div>;
};

const InfoButton = {
  Container: InfoButtonContainer,
  Images: InfoButtonImage,
};

export default InfoButton;
