import { ReactNode } from 'react';

import { cn } from '@confeti/utils';

import * as styles from './description.css';

interface DescriptionTextProps {
  descriptionText: string;
  fontSize: 18 | 20;
  children?: ReactNode;
}

interface HighlightedTextProps {
  highlightedText: string;
  fontSize: 18 | 20;
}

const Text = ({
  descriptionText,
  fontSize,
  children,
}: DescriptionTextProps) => {
  return (
    <span className={cn(styles.descriptionTextVariants({ fontSize }))}>
      {descriptionText}
      {children}
    </span>
  );
};

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
