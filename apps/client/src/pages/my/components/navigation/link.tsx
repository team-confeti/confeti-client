import SvgIcArrowGray16 from 'node_modules/@confeti/design-system/src/icons/src/IcArrowGray16';

import * as styles from './link.css';

interface LinkProps {
  label: string;
  path: string;
}

const Link = ({ label, path }: LinkProps) => {
  return (
    <a className={styles.navigationLink} href={path}>
      <p className={styles.linkText}>{label}</p>
      <SvgIcArrowGray16 width={'1.6rem'} height={'1.6rem'} />
    </a>
  );
};

export default Link;
