import { ReactNode } from 'react';
import { cn } from '@confeti/design-system/utils';
import {
  containerVariants,
  ItemContainer,
  ItemsVariants,
  ImageVariants,
  TextVariants,
} from './info-button.css';
import AddButton from '../add/add-button';

interface InfoTotalWrapProps {
  festivals: readonly {
    festivalId: number;
    title: string;
    logoUrl: string;
  }[];
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

interface InfoItemContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

interface FixedButtonProps {
  size?: 'sm' | 'md' | 'lg';
}

interface InfoItemsProps {
  children?: ReactNode;
  src: string;
  alt: string;
  text: string;
  size?: 'sm' | 'md' | 'lg';
}

interface ItemImagesProps {
  size?: 'sm' | 'md' | 'lg';
  src: string;
  alt: string;
}

interface ItemTextProps {
  size?: 'sm' | 'md' | 'lg';
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

const FixedButton = ({ size = 'md' }: FixedButtonProps) => (
  <>
    <div className={cn(ItemsVariants({ size }))}>
      <AddButton size="md" />
      <InfoButton.TextField text={`페스티벌\n추가`} color="gray" />
    </div>
  </>
);

const InfoItems = ({ size = 'md', src, alt, text }: InfoItemsProps) => (
  <>
    <div className={cn(ItemsVariants({ size }))}>
      <InfoButton.ImageField src={src} alt={alt} />
      <InfoButton.TextField text={text} color="black" />
    </div>
  </>
);

const ItemImage = ({ size = 'md', src, alt }: ItemImagesProps) => (
  <img className={cn(ImageVariants({ size }))} src={src} alt={alt} />
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
