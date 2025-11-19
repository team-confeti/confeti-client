import { useReducer, useState } from 'react';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { SETLIST_MUTATION_OPTIONS } from '@shared/apis/my-history/setlist-mutations';
import { SETLIST_QUERY_OPTIONS } from '@shared/apis/my-history/setlist-queries';
import { Footer, Hero } from '@shared/components';
import { routePath } from '@shared/router/path';
import { buildPath } from '@shared/utils/build-path';

import SetListHeader from '@pages/setlist/components/setlist-detail/setlist-detail-header';
import SetListEmpty from '@pages/setlist/components/setlist-detail/setlist-empty';
import SetListTracks, {
  SetListTrack,
} from '@pages/setlist/components/setlist-detail/setlist-tracks';

const SetListDetailPage = () => {
  const editModeReducer = (
    state: boolean,
    action: 'START' | 'COMPLETE' | 'ERROR',
  ) => {
    switch (action) {
      case 'START':
        return true;
      case 'COMPLETE':
        return false;
      case 'ERROR':
        return !state;
      default:
        return state;
    }
  };
  const { setlistId } = useParams<{ setlistId: string }>();
  const navigate = useNavigate();

  if (!setlistId) {
    throw new Error('잘못된 접근입니다. (setlistId 없음)');
  }

  const { data: setlistDetail } = useSuspenseQuery(
    SETLIST_QUERY_OPTIONS.DETAIL(Number(setlistId)),
  );

  const [isEditMode, dispatchEditMode] = useReducer(editModeReducer, false);
  const [reorderedTracks, setReorderedTracks] = useState<SetListTrack[]>([]);

  const hasNoMusic = setlistDetail.musics.length === 0;
  const hasNoReorderedTracks = reorderedTracks.length === 0;

  const formatTracksWithOrder = (tracks: SetListTrack[]) => {
    return tracks.map((track, index) => ({
      musicId: track.musicId,
      orders: index + 1,
    }));
  };

  const { mutate: startEditSetlist } = useMutation({
    ...SETLIST_MUTATION_OPTIONS.POST_START_EDIT_SETLIST(),
    onSuccess: () => dispatchEditMode('START'),
    onError: () => dispatchEditMode('COMPLETE'),
  });

  const { mutate: completeEditSetList } = useMutation({
    ...SETLIST_MUTATION_OPTIONS.PATCH_COMPLETE_EDIT_SETLIST(),
    onSuccess: () => dispatchEditMode('COMPLETE'),
    onError: () => dispatchEditMode('START'),
  });

  const { mutate: reorderSetList } = useMutation({
    ...SETLIST_MUTATION_OPTIONS.PATCH_REORDER_SETLIST(),
    onSuccess: () => dispatchEditMode('COMPLETE'),
    onError: () => dispatchEditMode('START'),
  });

  const handleStartEdit = () => {
    startEditSetlist(Number(setlistId));
  };

  const handleCompleteEdit = () => {
    if (hasNoReorderedTracks) return;
    const formatted = formatTracksWithOrder(reorderedTracks);
    reorderSetList({ setlistId: Number(setlistId), tracks: formatted });
    completeEditSetList(Number(setlistId));
  };

  const handleClickAdd = () => {
    navigate(buildPath(routePath.MY_ADD_SONGS_ABSOLUTE, { setlistId }));
  };

  return (
    <>
      <Hero
        posterUrl={setlistDetail.posterUrl}
        title={setlistDetail.title}
        startAt={setlistDetail.startAt}
        onClickBack={() => window.history.back()}
      />

      <SetListHeader
        isEditMode={isEditMode}
        showEditButton={!hasNoMusic}
        onClickStartEdit={handleStartEdit}
        onClickCompleteEdit={handleCompleteEdit}
      />

      {hasNoMusic ? (
        <SetListEmpty />
      ) : (
        <SetListTracks
          setlistId={setlistDetail.setlistId}
          tracks={setlistDetail.musics}
          isEditMode={isEditMode}
          onClickAdd={handleClickAdd}
          onTracksChange={(tracks) => setReorderedTracks(tracks)}
        />
      )}

      <Footer />
    </>
  );
};

export default SetListDetailPage;
