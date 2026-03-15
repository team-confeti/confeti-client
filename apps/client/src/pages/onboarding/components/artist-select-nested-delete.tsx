import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { Avatar, Button } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { LogClickEvent, LogShowEvent } from '@shared/analytics/logging';
import {
  ONBOARD_MUTATION_OPTIONS,
  ONBOARD_QUERY_OPTIONS,
} from '@shared/apis/onboard/queries';
import { DetailHeader } from '@shared/components';
import { ONBOARD_QUERY_KEY } from '@shared/constants/query-key';

import * as styles from './artist-select-nested-delete.css';

interface ArtistSelectNestedDeleteProps {
  onBack: () => void;
}

const ArtistSelectNestedDelete = ({
  onBack,
}: ArtistSelectNestedDeleteProps) => {
  const [_searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { data: selectedArtistData } = useSuspenseQuery({
    ...ONBOARD_QUERY_OPTIONS.SELECTED_ARTIST(),
  });
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
        setSearchParams({});
      },
    });
  };

  return (
    <div className={styles.wrapper}>
      <LogShowEvent name="show_onboarding_artist_edit" />
      <DetailHeader title="아티스트 선택" onBack={onBack} />
      <div className={styles.container}>
        {selectedArtistData.data.artists.map((artist) => (
          <LogClickEvent
            key={artist.artistId}
            name="click_onboarding_delete_artist"
            params={{
              target_id: artist.artistId,
            }}
          >
            <div
              className={styles.selectedArtistItem}
              onClick={() => handleCheckboxClick(artist.artistId)}
            >
              <div className={styles.selectedArtistItemContent}>
                <Avatar
                  size="xs"
                  src={artist.profileUrl}
                  isHandleClick={false}
                />
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
          </LogClickEvent>
        ))}
      </div>
      <div className={styles.confirmButtonWrapper}>
        <LogClickEvent
          name="click_onboarding_delete_selected_artists"
          params={{ count: checkedIds.length }}
        >
          <Button
            text="삭제하기"
            onClick={handleCompleteClick}
            variant="add"
            disabled={checkedIds.length === 0}
          />
        </LogClickEvent>
      </div>
    </div>
  );
};

export default ArtistSelectNestedDelete;
