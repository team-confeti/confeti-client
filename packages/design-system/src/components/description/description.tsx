import { cn } from '../../utils';

import * as styles from './description.css';

interface DescriptionTextProps {
  descriptionText: string;
  fontSize: 18 | 20;
}

const Description = ({ descriptionText, fontSize }: DescriptionTextProps) => {
  return (
    <p className={cn(styles.descriptionTextVariants({ fontSize }))}>
      {descriptionText}
    </p>
  );
};
export default Description;
