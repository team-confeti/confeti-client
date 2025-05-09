import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAddSongsMutation } from '@pages/my-history/hooks/use-add-songs-mutation';

import { Button, Dialog, MusicItem, useOverlay } from '@confeti/design-system';
import { BtnArrowLeft20 } from '@confeti/design-system/icons';
import { routePath } from '@shared/router/path';
import { buildPath } from '@shared/utils/build-path';

import * as styles from './confirm-add-section.css';

interface MusicItemType {
  musicId: number;
  title: string;
  artistName: string;
  artworkUrl: string;
}

interface Props {
  handleRemoveSong: (songId: number) => void;
  selectedSongs: MusicItemType[];
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
  const addMusicToSetListMutation = useAddSongsMutation(Number(setlistId));
  const handleOpenDeleteDialog = ({
    title,
    musicId,
  }: {
    title: string;
    musicId: number;
  }) => {
    overlay.open(({ isOpen, close }) => (
      <Dialog open={isOpen} handleClose={close}>
        <Dialog.Content>
          <Dialog.Title>
            <div className={styles.dialogTitleContainer}>
              <p className={styles.dialogHighlightText}>{title}</p>
            </div>
            <span>을(를) 삭제할까요?</span>
          </Dialog.Title>
          <Dialog.Description>
            대기열에서 해당 곡이 삭제됩니다.
          </Dialog.Description>
        </Dialog.Content>
        <Dialog.Action>
          <Button text="돌아가기" onClick={close} variant="back" />
          <Button
            text="삭제하기"
            onClick={() => {
              handleRemoveSong(musicId);
              close();
            }}
          />
        </Dialog.Action>
      </Dialog>
    ));
  };
  const handleAddMusicToSetList = () => {
    const requestData = selectedSongs.map((song) => ({
      trackId: String(song.musicId),
      artistName: song.artistName,
      trackName: song.title,
      artworkUrl: song.artworkUrl,
      previewUrl: '',
    }));
    addMusicToSetListMutation.mutate(requestData);

    navigate(
      buildPath(routePath.MY_HISTORY_SETLIST_DETAIL, {
        setlistId: setlistId ?? '',
      }),
    );
  };

  return (
    <div>
      <header className={styles.headerContainer}>
        <button aria-label="뒤로가기" onClick={handleConfirmAddSection}>
          <BtnArrowLeft20 width={'2rem'} height={'2rem'} />
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
            musicId={String(song.musicId)}
            albumImage={song.artworkUrl}
            title={song.title}
            artist={song.artistName}
            variant="confirmDelete"
            onClickDelete={() =>
              handleOpenDeleteDialog({
                title: song.title,
                musicId: Number(song.musicId),
              })
            }
          />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button
          text="셋리스트에 추가하기"
          disabled={selectedSongs.length === 0}
          onClick={handleAddMusicToSetList}
        />
      </div>
    </div>
  );
};

export default ConfirmAddSection;
