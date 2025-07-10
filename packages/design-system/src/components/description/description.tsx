import { ReactNode } from 'react';

import { cn } from '@confeti/utils';

import * as styles from './description.css';

interface TextProps {
  descriptionText: string;
  fontSize: 18 | 20;
  children?: ReactNode;
}

const Text = ({ descriptionText, fontSize, children }: TextProps) => {
  return (
    <span className={cn(styles.descriptionTextVariants({ fontSize }))}>
      {descriptionText}
      {children}
    </span>
  );
};

interface HighlightedTextProps {
  highlightedText: string;
  fontSize: 18 | 20;
}

const HighlightedText = ({
  highlightedText,
  fontSize,
}: HighlightedTextProps) => {
  return (
    <span className={cn(styles.highlightedText({ fontSize }))}>
      {highlightedText}
    </span>
  );
};

const Description = {
  Text: Text,
  HighlightedText: HighlightedText,
};

export default Description;
