import { useEffect, useState } from 'react';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button, Dialog } from '@confeti/design-system';

import {
  LogClickEvent,
  logClickEvent,
  LogShowEvent,
} from '@shared/analytics/logging';
import { SETLIST_MUTATION_OPTIONS } from '@shared/apis/setlist/setlist-mutations.ts';
import { MusicList } from '@shared/components';
import { SETLIST_QUERY_KEY } from '@shared/constants/query-key';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { limitTextLength } from '@shared/utils/limit-text-length';

import { useEditCancelOnLeave } from '../../../setlist/hooks/use-edit-cancel-on-leave.ts';
import { usePreventScroll } from '../../../setlist/hooks/use-prevent-scroll.ts';
import AddMusicButton from '../../components/setlist-detail/add-music-button';

import * as styles from './setlist-tracks.css';

export interface SetListTrack {
  musicId: string;
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
  const [isDragging, setIsDragging] = useState(false);
  usePreventScroll(isDragging);
  const queryClient = useQueryClient();
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const { mutate: deleteMusic } = useMutation({
    ...SETLIST_MUTATION_OPTIONS.DELETE_MUSIC_FROM_SETLIST(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: SETLIST_QUERY_KEY.DETAIL(setlistId),
      });
    },
  });
  const { mutate: cancelEditSetlist } = useMutation({
    ...SETLIST_MUTATION_OPTIONS.DELETE_CANCEL_EDIT_SETLIST(),
  });

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

  const { musicList, onClickPlayToggle, audioRef, audioEvents } =
    useMusicPlayer(localTracks);

  const removeTrackFromLocal = (musicId: string) => {
    setLocalTracks((prev) => prev.filter((track) => track.musicId !== musicId));
  };

  const handleConfirmDelete = () => {
    if (!selectedTrack) return;
    deleteMusic(
      {
        setlistId,
        orders: selectedTrack.orders,
      },
      {
        onSuccess: () => {
          removeTrackFromLocal(selectedTrack.musicId);
          setDialogOpen(false);
          setSelectedTrack(null);
        },
      },
    );
  };

  const handleOpenDialog = (track: SetListTrack) => {
    setSelectedTrack(track);
    setDialogOpen(true);
  };

  const handleClickPlayToggle = (musicId: string) => {
    logClickEvent({
      name: 'click_music_play_toggle',
      params: {
        source_page: 'setlist_detail',
        target_id: musicId,
        entry_point: 'setlist_track',
      },
    });
    onClickPlayToggle(musicId);
  };

  const handleClickDeleteTrack = (musicId: string) => {
    logClickEvent({
      name: 'click_setlist_open_delete_track',
      params: { target_id: musicId },
    });
    const target = localTracks.find(
      (track) => String(track.musicId) === musicId,
    );
    if (target) {
      handleOpenDialog(target);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
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
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localTracks.map((track) => String(track.musicId))}
          strategy={verticalListSortingStrategy}
        >
          <MusicList
            musics={musicList}
            variant={isEditMode ? 'editable' : 'default'}
            onClickPlayToggle={!isEditMode ? handleClickPlayToggle : undefined}
            onClickDelete={isEditMode ? handleClickDeleteTrack : undefined}
          />
        </SortableContext>
      </DndContext>

      <audio
        ref={audioRef}
        onLoadedMetadata={audioEvents.onLoadedMetadata}
        onTimeUpdate={audioEvents.onTimeUpdate}
        onSeeked={audioEvents.onSeeked}
        onPlay={audioEvents.onPlay}
        onPause={audioEvents.onPause}
        onEnded={audioEvents.onEnded}
      />

      <Dialog open={dialogOpen} handleClose={() => setDialogOpen(false)}>
        <LogShowEvent name="show_setlist_delete_track_confirm_dialog" />
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
          <LogClickEvent
            name="click_setlist_confirm_delete_track"
            params={{
              target_id: selectedTrack?.musicId ?? '',
            }}
          >
            <Button text="삭제하기" onClick={handleConfirmDelete} />
          </LogClickEvent>
        </Dialog.Action>
      </Dialog>
    </div>
  );
};

export default SetListTracks;
