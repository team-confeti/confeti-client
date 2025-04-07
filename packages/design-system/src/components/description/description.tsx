import { cn } from '../../utils';

import * as styles from './description.css';

interface DescriptionTextProps {
  descriptionText: string[];
  fontSize: 18 | 20;
}

const Description = ({ descriptionText, fontSize }: DescriptionTextProps) => {
  return descriptionText.map((text, index) => (
    <p key={index} className={cn(styles.descriptionTextVariants({ fontSize }))}>
      {text}
    </p>
  ));
};

export default Description;
