import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Avatar, Button } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { ONBOARD_MUTATION_OPTIONS } from '@shared/apis/onboard/queries';
import { DetailHeader } from '@shared/components';
import { ONBOARD_QUERY_KEY } from '@shared/constants/query-key';
import type { onboard } from '@shared/types/onboard-response';

import * as styles from './artist-select-nested-delete.css';

interface ArtistSelectNestedDeleteProps {
  selectedArtistData: onboard[];
  onBack: () => void;
}

const ArtistSelectNestedDelete = ({
  selectedArtistData,
  onBack,
}: ArtistSelectNestedDeleteProps) => {
  const queryClient = useQueryClient();
  const { mutate: mutatePatchSelectedArtist } = useMutation({
    ...ONBOARD_MUTATION_OPTIONS.PATCH_SELECTED_ARTIST(),
  });
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const handleCheckboxClick = (artistId: string) => {
    setCheckedIds((prev) => {
      if (prev.includes(artistId)) {
        return prev.filter((id) => id !== artistId);
      } else {
        return [...prev, artistId];
      }
    });
  };

  const handleCompleteClick = () => {
    mutatePatchSelectedArtist(checkedIds, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ONBOARD_QUERY_KEY.SELECTED_ARTIST(),
        });
        onBack();
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <DetailHeader title="아티스트 선택" onBack={onBack} />
      <div className={styles.container}>
        {selectedArtistData.map((artist) => (
          <div
            key={artist.artistId}
            className={styles.selectedArtistItem}
            onClick={() => handleCheckboxClick(artist.artistId)}
          >
            <div className={styles.selectedArtistItemContent}>
              <Avatar size="xs" src={artist.profileUrl} isHandleClick={false} />
              <p className={styles.artistName}>{artist.name}</p>
            </div>
            <div
              className={styles.checkbox({
                checked: checkedIds.includes(artist.artistId),
              })}
            >
              <Icon
                name="check"
                size="1.6rem"
                color={
                  checkedIds.includes(artist.artistId) ? 'gray900' : 'gray300'
                }
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.confirmButtonWrapper}>
        <Button
          text="삭제하기"
          onClick={handleCompleteClick}
          variant="add"
          disabled={checkedIds.length === 0}
        />
      </div>
    </div>
  );
};

export default ArtistSelectNestedDelete;
