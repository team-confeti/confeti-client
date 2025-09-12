import { PERFORMANCE_LABEL } from '@pages/performance/constant/performance';

import { openKakaoRoute } from '../../utils/kakao-map';
import MapView from '../map-view/map-view';

import * as styles from './location.css';

interface LocationProps {
  address: string;
}

const Location = ({ address }: LocationProps) => {
  const handleClick = () => {
    openKakaoRoute({
      address,
      by: 'publictransit',
      useCurrentAsStart: true,
    });
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{PERFORMANCE_LABEL.LOCATION}</h2>
      <p className={styles.address}>{address}</p>
      <MapView address={address} onClick={handleClick} />
    </section>
  );
};

export default Location;
