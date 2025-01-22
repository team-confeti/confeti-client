import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@confeti/design-system/utils';
import {
  containerVariants,
  ItemContainer,
  ItemsVariants,
  ImageVariants,
  TextVariants,
} from './info-button.css';
import { routePath } from '@shared/constants/path';
import AddButton from '../add/add-button';

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
}

interface InfoItemsProps {
  children?: ReactNode;
  src: string;
  alt: string;
  text: string;
  size?: SizeType;
  isClicked?: boolean;
  onClick(): void;
}

interface ItemImagesProps {
  size?: SizeType;
  src: string;
  alt: string;
  isClicked?: boolean;
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

const FixedButton = ({ size = 'md' }: FixedButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={cn(ItemsVariants({ size }))}
        onClick={() => navigate(routePath.ADDFESTIVAL)}
      >
        <AddButton size="md" />
        <InfoButton.TextField text={`페스티벌\n추가`} color="gray" />
      </div>
    </>
  );
};
const InfoItems = ({
  size = 'md',
  src,
  alt,
  text,
  onClick,
  isClicked,
}: InfoItemsProps) => (
  <>
    <InfoButton.ImageField src={src} alt={alt} isClicked={isClicked} />
    <InfoButton.TextField text={text} color="black" />
  </>
);

const ItemImage = ({ size = 'md', src, alt, isClicked }: ItemImagesProps) => (
  <img className={cn(ImageVariants({ size, isClicked }))} src={src} alt={alt} />
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
