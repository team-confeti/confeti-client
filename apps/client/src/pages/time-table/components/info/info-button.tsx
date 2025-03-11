import { cn } from '@confeti/design-system/utils';
import { routePath } from '@shared/constants/path';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import AddButton from '../add/add-button';
import {
  containerVariants,
  ImageVariants,
  ItemContainer,
  ItemsVariants,
  TextVariants,
} from './info-button.css';

type SizeType = 'sm' | 'md' | 'lg';

interface InfoTotalWrapProps {
  festivals: readonly {
    festivalId: number;
    title: string;
    logoUrl: string;
  }[];
  children: ReactNode;
  size?: SizeType;
}

interface InfoItemContainerProps {
  children: ReactNode;
  size?: SizeType;
}

interface FixedButtonProps {
  size?: SizeType;
  disabled: boolean;
}

interface InfoItemsProps {
  children?: ReactNode;
  src: string;
  alt: string;
  text: string;
  size?: SizeType;
  isClicked?: boolean;
  isFestivalDeleteMode?: boolean;
  onClick: () => void;
}

interface ItemImagesProps {
  size?: SizeType;
  src: string;
  alt: string;
  isClicked?: boolean;
  onClick: () => void;
}

interface ItemTextProps {
  size?: SizeType;
  color: 'gray' | 'black';
  text: string;
}

const InfoWrapContainer = ({ children, size = 'md' }: InfoTotalWrapProps) => (
  <section className={cn(containerVariants({ size }))}>{children}</section>
);

const InfoItemContainer = ({
  size = 'md',
  children,
}: InfoItemContainerProps) => (
  <div className={cn(ItemContainer({ size }))}>{children}</div>
);

const FixedButton = ({ size = 'md', disabled }: FixedButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={cn(ItemsVariants({ size }))}
        onClick={() => navigate(routePath.ADDFESTIVAL)}
      >
        <AddButton size="md" disabled={disabled} />
        <InfoButton.TextField text={`페스티벌\n추가`} color="gray" />
      </div>
    </>
  );
};

const InfoItems = ({
  src,
  alt,
  text,
  isClicked,
  onClick,
  isFestivalDeleteMode,
}: InfoItemsProps) => (
  <>
    <InfoButton.ImageField
      src={src}
      alt={alt}
      isClicked={isClicked}
      onClick={onClick}
      isFestivalDeleteMode={isFestivalDeleteMode}
    />
    <InfoButton.TextField text={text} color="black" />
  </>
);

const ItemImage = ({
  size = 'md',
  src,
  alt,
  isClicked,
  onClick,
  isFestivalDeleteMode,
}: ItemImagesProps & { isFestivalDeleteMode?: boolean }) => (
  <img
    className={cn(ImageVariants({ size, isClicked, isFestivalDeleteMode }))}
    src={src}
    alt={alt}
    onClick={onClick}
  />
);

const ItemText = ({ size = 'md', text, color }: ItemTextProps) => (
  <span className={cn(TextVariants({ size, color }))}>{text}</span>
);

const InfoButton = {
  TotalWrap: InfoWrapContainer,
  ItemContainer: InfoItemContainer,
  FixButton: FixedButton,
  Items: InfoItems,
  ImageField: ItemImage,
  TextField: ItemText,
};

export default InfoButton;
