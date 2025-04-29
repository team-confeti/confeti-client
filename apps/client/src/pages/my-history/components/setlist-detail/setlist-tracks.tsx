import { useEffect, useMemo, useState } from 'react';

import { Button, Dialog, MusicList } from '@confeti/design-system';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { limitTextLength } from '@shared/utils/limit-text-length';

import AddMusicButton from '../../components/setlist-detail/add-music-button';
import { useDeleteMusicMutation } from '../../hooks/use-delete-music-mutation';
import { useEditCancelOnLeave } from '../../hooks/use-edit-cancel-on-leave';
import {
  useCancelEditSetList,
  useStartEditSetList,
} from '../../hooks/use-setlist-detail';

import * as styles from './setlist-tracks.css';

interface SetListTrack {
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
  tracks: SetListTrack[];
  isEditMode: boolean;
  onClickAdd: () => void;
  getDragHandleProps: (musicId: string) => React.HTMLAttributes<HTMLElement>;
  onCompleteEdit: () => void;
}

const SetListTracks = ({
  setlistId,
  tracks,
  isEditMode,
  onClickAdd,
  getDragHandleProps,
}: SetListTracksProps) => {
  const [localTracks, setLocalTracks] = useState<SetListTrack[]>(tracks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<SetListTrack | null>(null);

  const { mutate: deleteMusic } = useDeleteMusicMutation(setlistId);
  const { mutate: startEditSetlist } = useStartEditSetList();
  const { mutate: cancelEditSetlist } = useCancelEditSetList();

  useEffect(() => {
    setLocalTracks(tracks);
  }, [tracks]);

  useEffect(() => {
    if (isEditMode) {
      startEditSetlist(setlistId);
    }
  }, [isEditMode, setlistId, startEditSetlist]);

  useEditCancelOnLeave(isEditMode, () => cancelEditSetlist(setlistId));

  const mappedTracks = useMemo(
    () =>
      localTracks.map((track) => ({
        musicId: String(track.musicId),
        artworkUrl: track.artworkUrl,
        title: track.trackName,
        artistName: track.artistName,
        previewUrl: track.previewUrl,
      })),
    [localTracks],
  );

  const { musicList, onClickPlayToggle, audioRef } =
    useMusicPlayer(mappedTracks);

  const removeTrackFromLocal = (musicId: number) => {
    setLocalTracks((prev) => prev.filter((track) => track.musicId !== musicId));
  };

  const handleConfirmDelete = () => {
    if (!selectedTrack) return;
    deleteMusic(selectedTrack.orders, {
      onSuccess: () => {
        removeTrackFromLocal(selectedTrack.musicId);
        setDialogOpen(false);
        setSelectedTrack(null);
      },
    });
  };

  const handleOpenDialog = (track: SetListTrack) => {
    setSelectedTrack(track);
    setDialogOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      {isEditMode && <AddMusicButton onClick={onClickAdd} />}

      <MusicList
        musics={musicList}
        variant={isEditMode ? 'editable' : 'default'}
        onClickPlayToggle={!isEditMode ? onClickPlayToggle : undefined}
        onClickDelete={
          isEditMode
            ? (musicId) => {
                const target = localTracks.find(
                  (t) => String(t.musicId) === musicId,
                );
                if (target) handleOpenDialog(target);
              }
            : undefined
        }
        getDragHandleProps={isEditMode ? getDragHandleProps : undefined}
      />

      <audio ref={audioRef} />

      <Dialog open={dialogOpen} handleClose={() => setDialogOpen(false)}>
        <Dialog.Content>
          <Dialog.Title>
            <span className={styles.highlightText}>
              {selectedTrack
                ? limitTextLength(selectedTrack.trackName, 10)
                : ''}
            </span>
            을(를) 삭제할까요?
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
