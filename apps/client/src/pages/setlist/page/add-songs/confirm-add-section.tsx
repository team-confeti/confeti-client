import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Button, Dialog, MusicItem, useOverlay } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import {
  LogClickEvent,
  logClickEvent,
  LogShowEvent,
} from '@shared/analytics/logging';
import { SETLIST_MUTATION_OPTIONS } from '@shared/apis/setlist/setlist-mutations';
import { routePath } from '@shared/router/path';
import { AddMusicToSetListRequest } from '@shared/types/my-history-response';
import { buildPath } from '@shared/utils/build-path';

import * as styles from './confirm-add-section.css';

interface Props {
  handleRemoveSong: (musicId: string) => void;
  selectedSongs: AddMusicToSetListRequest[];
  handleConfirmAddSection: () => void;
}

const ConfirmAddSection = ({
  handleRemoveSong,
  selectedSongs,
  handleConfirmAddSection,
}: Props) => {
  const { setlistId } = useParams<{ setlistId: string }>();
  const totalNum = selectedSongs.length;
  const overlay = useOverlay();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    ...SETLIST_MUTATION_OPTIONS.POST_ADD_MUSIC_TO_SETLIST(),
    onSuccess: async () => {
      navigate(
        buildPath(routePath.MY_SETLIST_DETAIL_ABSOLUTE, {
          setlistId: setlistId ?? '',
        }),
      );
    },
  });

  const handleAddMusicToSetList = () => {
    mutate({
      setlistId: Number(setlistId),
      musics: selectedSongs,
    });
  };

  const handleOpenDeleteDialog = ({
    trackName,
    musicId,
  }: {
    trackName: string;
    musicId: string;
  }) => {
    overlay.open(({ isOpen, close }) => {
      const handleConfirmRemoveSong = () => {
        handleRemoveSong(musicId);
        close();
      };

      return (
        <>
          <LogShowEvent name="show_setlist_add_song_delete_confirm_dialog" />
          <Dialog open={isOpen} handleClose={close}>
            <Dialog.Content>
              <Dialog.Title>
                <div className={styles.dialogTitleContainer}>
                  <p className={styles.dialogHighlightText}>{trackName}</p>
                </div>
                <span>을(를) 삭제할까요?</span>
              </Dialog.Title>
              <Dialog.Description>
                대기열에서 해당 곡이 삭제됩니다.
              </Dialog.Description>
            </Dialog.Content>
            <Dialog.Action>
              <Button text="돌아가기" onClick={close} variant="back" />
              <LogClickEvent
                name="click_song_remove_from_queue"
                params={{
                  source_page: 'setlist_add_songs',
                  target_id: musicId,
                }}
              >
                <Button text="삭제하기" onClick={handleConfirmRemoveSong} />
              </LogClickEvent>
            </Dialog.Action>
          </Dialog>
        </>
      );
    });
  };

  const handleOpenSongDeleteDialog = (trackName: string, musicId: string) => {
    logClickEvent({
      name: 'click_song_remove_from_queue',
      params: {
        source_page: 'setlist_add_songs',
        target_id: musicId,
      },
    });
    handleOpenDeleteDialog({ trackName, musicId });
  };

  return (
    <div>
      <LogShowEvent name="show_setlist_add_songs_confirm" />
      <header className={styles.headerContainer}>
        <button aria-label="뒤로가기" onClick={handleConfirmAddSection}>
          <Icon name="arrow-horizontal" size="2.2rem" rotate={180} />
        </button>
      </header>
      <div className={styles.textContainer}>
        <p className={styles.totalNumText}>
          총 <span className={styles.totalNumTextHighlight}>{totalNum}</span>곡
        </p>
        <p className={styles.confirmText}>선택하신 곡 목록이 맞나요?</p>
      </div>
      <div className={styles.musicListContainer}>
        {selectedSongs.map((song) => (
          <MusicItem
            key={song.musicId}
            musicId={song.musicId}
            albumImage={song.artworkUrl}
            title={song.trackName}
            artist={song.artistName}
            variant="confirmDelete"
            onClickDelete={() =>
              handleOpenSongDeleteDialog(song.trackName, song.musicId)
            }
            appearance="default"
          />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <LogClickEvent
          name="click_setlist_create"
          params={{ count: selectedSongs.length }}
        >
          <Button
            text="셋리스트에 추가하기"
            disabled={selectedSongs.length === 0}
            onClick={handleAddMusicToSetList}
          />
        </LogClickEvent>
      </div>
    </div>
  );
};

export default ConfirmAddSection;
