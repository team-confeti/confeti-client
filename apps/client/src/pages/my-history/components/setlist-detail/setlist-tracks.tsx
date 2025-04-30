import { useEffect, useMemo, useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Button, Dialog, MusicList } from '@confeti/design-system';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { limitTextLength } from '@shared/utils/limit-text-length';

import AddMusicButton from '../../components/setlist-detail/add-music-button';
import { useDeleteMusicMutation } from '../../hooks/use-delete-music-mutation';
import { useEditCancelOnLeave } from '../../hooks/use-edit-cancel-on-leave';
import { useCancelEditSetList } from '../../hooks/use-setlist-detail';

import * as styles from './setlist-tracks.css';

export interface SetListTrack {
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
  onTracksChange: (tracks: SetListTrack[]) => void;
}

const SetListTracks = ({
  setlistId,
  tracks,
  isEditMode,
  onClickAdd,
  onTracksChange,
}: SetListTracksProps) => {
  const [localTracks, setLocalTracks] = useState<SetListTrack[]>(tracks);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<SetListTrack | null>(null);

  const { mutate: deleteMusic } = useDeleteMusicMutation(setlistId);
  const { mutate: cancelEditSetlist } = useCancelEditSetList();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  useEffect(() => {
    setLocalTracks(tracks);
  }, [tracks]);

  useEffect(() => {
    onTracksChange(localTracks);
  }, [localTracks, onTracksChange]);

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
  console.log(mappedTracks);

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLocalTracks((prevTracks) => {
      const oldIndex = prevTracks.findIndex(
        (t) => String(t.musicId) === active.id,
      );
      const newIndex = prevTracks.findIndex(
        (t) => String(t.musicId) === over.id,
      );
      return arrayMove(prevTracks, oldIndex, newIndex);
    });
  };

  return (
    <div className={styles.wrapper}>
      {isEditMode && <AddMusicButton onClick={onClickAdd} />}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localTracks.map((track) => String(track.musicId))}
          strategy={verticalListSortingStrategy}
        >
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
          />
        </SortableContext>
      </DndContext>

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
