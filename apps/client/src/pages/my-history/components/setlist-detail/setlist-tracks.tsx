import { useState } from 'react';

import { Button, Dialog, MusicList } from '@confeti/design-system';
import { useMusicPlayer } from '@shared/hooks/use-music-player';

import AddMusicButton from '../../components/setlist-detail/add-music-button';
import { useDeleteMusicMutation } from '../../hooks/use-delete-music-mutation';

import * as styles from './setlist-tracks.css';

interface RawTrack {
  musicId: number;
  trackId: string;
  trackName: string;
  artistName: string;
  artworkUrl: string;
  previewUrl: string;
  orders: number;
}

interface SetListTracksProps {
  setlistId: number;
  tracks: RawTrack[];
  isEditMode: boolean;
  onClickAdd: () => void;
  getDragHandleProps: (musicId: string) => React.HTMLAttributes<HTMLElement>;
}

const SetListTracks = ({
  setlistId,
  tracks,
  isEditMode,
  onClickAdd,
  getDragHandleProps,
}: SetListTracksProps) => {
  const mappedTracks = tracks.map((track) => ({
    musicId: String(track.musicId),
    artworkUrl: track.artworkUrl,
    title: track.trackName,
    artistName: track.artistName,
    previewUrl: track.previewUrl,
  }));

  const { musicList, onClickPlayToggle, audioRef } =
    useMusicPlayer(mappedTracks);

  const { mutate: deleteMusic } = useDeleteMusicMutation(setlistId);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<RawTrack | null>(null);

  const handleConfirmDelete = () => {
    if (selectedTrack) {
      deleteMusic(selectedTrack.orders);
      setDialogOpen(false);
      setSelectedTrack(null);
    }
  };

  const handleOpenDialog = (track: RawTrack) => {
    setSelectedTrack(track);
    setDialogOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      {isEditMode ? (
        <>
          <AddMusicButton onClick={onClickAdd} />
          <MusicList
            musics={musicList}
            variant="editable"
            onClickDelete={(musicId) => {
              const target = tracks.find((t) => String(t.musicId) === musicId);
              if (target) handleOpenDialog(target);
            }}
            getDragHandleProps={getDragHandleProps}
          />
        </>
      ) : (
        <>
          <MusicList
            musics={musicList}
            variant="default"
            onClickPlayToggle={onClickPlayToggle}
          />
          <audio ref={audioRef} />
        </>
      )}

      <Dialog open={dialogOpen} handleClose={() => setDialogOpen(false)}>
        <Dialog.Content>
          <Dialog.Title>
            <>
              <strong style={{ color: '#B5EB00' }}>
                {selectedTrack?.trackName}-{selectedTrack?.artistName}
              </strong>
              을(를) 삭제할까요?
            </>
          </Dialog.Title>
          <Dialog.Description>
            셋리스트에서 해당 곡이 삭제됩니다.
          </Dialog.Description>
        </Dialog.Content>
        <Dialog.Action>
          <Button
            text="돌아가기"
            onClick={() => setDialogOpen(false)}
            variant="back"
          />
          <Button text="삭제하기" onClick={handleConfirmDelete} />
        </Dialog.Action>
      </Dialog>
    </div>
  );
};

export default SetListTracks;
