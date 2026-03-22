import { toast } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';
import { onError, onSuccess } from '@confeti/utils';

import { LogClickEvent } from '@shared/analytics/logging';

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
    await onError(() => {
      toast({
        text: '복사에 실패했어요. 다시 시도해주세요!',
        position: 'bottomCenter',
      });
    })(
      onSuccess(() => {
        toast({
          text: '주소가 복사되었어요.',
          position: 'bottomCenter',
        });
      })(async (nextAddress: string) =>
        navigator.clipboard.writeText(nextAddress),
      ),
    )(address);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>오시는 길</h2>
      <div className={styles.address}>
        {address}
        <LogClickEvent name="click_copy_address">
          <button
            type="button"
            className={styles.copyButton}
            onClick={handleAddressCopy}
            aria-label="주소 복사"
          >
            <Icon name="copy" size="2rem" color="gray400" />
          </button>
        </LogClickEvent>
      </div>
      <LogClickEvent name="click_open_map">
        <MapView address={address} onClick={handleClick} />
      </LogClickEvent>
    </section>
  );
};

export default Location;
