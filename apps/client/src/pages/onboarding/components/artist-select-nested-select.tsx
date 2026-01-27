import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Avatar,
  Button,
  Description,
  SearchBar,
  toast,
} from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import {
  ONBOARD_MUTATION_OPTIONS,
  ONBOARD_QUERY_OPTIONS,
} from '@shared/apis/onboard/queries';
import { ONBOARD_QUERY_KEY } from '@shared/constants/query-key';
import { routePath } from '@shared/router/path';

import { ONBOARD_LIMIT } from '../constants/limit';
import OnboardingChip from './onboarding-chip';

import * as styles from './artist-select.css';

interface ArtistSelectNestedSelectProps {
  onSearchFocus: () => void;
  onEditClick: () => void;
  onNextClick: () => void;
}

const ArtistSelectNestedSelect = ({
  onSearchFocus,
  onEditClick,
  onNextClick,
}: ArtistSelectNestedSelectProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const targetArtistId = searchParams.get('artist');

  const { data: artistData } = useSuspenseQuery({
    ...ONBOARD_QUERY_OPTIONS.TOP_ARTIST(
      ONBOARD_LIMIT.TOP_ARTIST,
      targetArtistId,
    ),
  });

  const { data: selectedArtistData } = useSuspenseQuery({
    ...ONBOARD_QUERY_OPTIONS.SELECTED_ARTIST(),
  });

  const { mutate: mutateAuthOnboard } = useMutation({
    ...ONBOARD_MUTATION_OPTIONS.AUTH_ONBOARD(),
  });

  const { mutate: mutateSelectedArtist } = useMutation({
    ...ONBOARD_MUTATION_OPTIONS.SELECTED_ARTIST(),
  });

  if (!artistData) {
    throw new Error(
      '아티스트 데이터를 불러오는 중 오류가 발생했어요. 다시 시도해주세요.',
    );
  }

  const handleArtistClick = (artistId: string) => {
    mutateSelectedArtist([artistId], {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ONBOARD_QUERY_KEY.SELECTED_ARTIST(),
        });
        setSearchParams({ artist: artistId });
      },
    });
  };

  const handleNextClick = () => {
    mutateAuthOnboard(
      selectedArtistData.data.artists.map((artist) => artist.artistId),
      {
        onSuccess: () => {
          onNextClick();
        },
        onError: () => {
          toast({
            text: '온보딩 처리 중 오류가 발생했어요. 다시 시도해주세요.',
            icon: <Icon name="warning" size="2rem" color="confeti_red" />,
          });
          navigate(routePath.ROOT);
        },
      },
    );
  };

  return (
    <section className={styles.onboardingContentSection}>
      <Description.Text
        descriptionText={'선호하는 아티스트를\n모두 선택해주세요'}
        fontSize={20}
      />
      <div className={styles.searchBarSection}>
        <SearchBar
          showBackButton={false}
          placeholder="아티스트를 검색해주세요!"
          onFocus={onSearchFocus}
        />
      </div>
      {selectedArtistData.data.artists.length > 0 && (
        <div className={styles.selectedArtistPriviewSection}>
          <div className={styles.selectedArtistPreview}>
            <LayoutGroup>
              <div className={styles.selectedArtistList}>
                <AnimatePresence>
                  {selectedArtistData.data.artists.map((artist) => (
                    <motion.div
                      key={artist.artistId}
                      className={styles.selectedArtistItem}
                      layout
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        layout: { duration: 0.4, ease: 'easeOut' },
                      }}
                    >
                      <Avatar
                        size="sesm"
                        borderVariant="selected"
                        src={artist.profileUrl}
                        alt={`${artist.name} 이미지`}
                        isHandleClick={false}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <motion.div
                className={styles.selectedArtistItem}
                layout
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <OnboardingChip
                  onClick={onEditClick}
                  count={selectedArtistData.data.artists.length}
                />
              </motion.div>
            </LayoutGroup>
          </div>
        </div>
      )}
      <div className={styles.avatarGridSection}>
        {artistData.artists.map((artist, index) => (
          <motion.div
            key={`${artist.artistId}-${targetArtistId}`}
            className={styles.avatar}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.04,
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Avatar
                size="xl"
                src={artist.profileUrl}
                alt={`${artist.name} 이미지`}
                onClick={() => handleArtistClick(artist.artistId)}
              />
            </motion.div>
            <p className={styles.artistName}>{artist.name}</p>
          </motion.div>
        ))}
      </div>
      <Button
        text={'다음'}
        variant={'add'}
        onClick={handleNextClick}
        disabled={selectedArtistData.data.artists.length < 1}
        className={styles.button}
      />
    </section>
  );
};

export default ArtistSelectNestedSelect;
