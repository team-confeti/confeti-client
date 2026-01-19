import { Fragment } from 'react';

import { toast } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

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

  const handleAddressCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast({
        text: '주소가 복사되었어요.',
        position: 'bottomCenter',
      });
    } catch {
      toast({
        text: '복사에 실패했어요. 다시 시도해주세요!',
        position: 'bottomCenter',
      });
    }
  };

  const formattedAddress = address.split(',').map((part, index, arr) => (
    <Fragment key={index}>
      {part.trim()}
      {index < arr.length - 1 && ','}
      {index < arr.length - 1 && <br />}
    </Fragment>
  ));

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{PERFORMANCE_LABEL.LOCATION}</h2>
      <p className={styles.address}>
        {formattedAddress}
        <button
          type="button"
          className={styles.copyButton}
          onClick={handleAddressCopy}
          aria-label="주소 복사"
        >
          <Icon name="copy" size="2rem" color="gray400" />
        </button>
      </p>
      <MapView address={address} onClick={handleClick} />
    </section>
  );
};

export default Location;
