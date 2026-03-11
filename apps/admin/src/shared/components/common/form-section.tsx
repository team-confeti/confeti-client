import { ReactNode } from 'react';

import * as styles from './form-section.css';

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const FormSection = ({ title, description, children }: FormSectionProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
};

export default FormSection;
