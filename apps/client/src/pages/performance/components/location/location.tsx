import { PERFORMANCE_LABEL } from '@pages/performance/constant/performance';

import MapView from '../map-view/map-view';

import * as styles from './location.css';

interface LocationProps {
  address: string;
}

const Location = ({ address }: LocationProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}> {PERFORMANCE_LABEL.LOCATION}</h2>
      <p className={styles.address}>{address}</p>
      <MapView address={address} />
    </section>
  );
};

export default Location;
