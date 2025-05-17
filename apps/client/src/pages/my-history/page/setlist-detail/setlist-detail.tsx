import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Footer } from '@confeti/design-system';
import Hero from '@shared/components/hero/hero';
import { routePath } from '@shared/router/path';
import { buildPath } from '@shared/utils/build-path';

import SetListHeader from '../../components/setlist-detail/setlist-detail-header';
import SetListEmpty from '../../components/setlist-detail/setlist-empty';
import SetListTracks, {
  SetListTrack,
} from '../../components/setlist-detail/setlist-tracks';
import {
  useCompleteEditSetList,
  useReorderSetList,
  useSetListDetail,
  useStartEditSetList,
} from '../../hooks/use-setlist-detail';

const SetListDetailPage = () => {
  const { setlistId } = useParams<{ setlistId: string }>();
  const navigate = useNavigate();
  if (!setlistId) {
    throw new Error('잘못된 접근입니다. (setlistId 없음)');
  }

  const { data: setlistDetail } = useSetListDetail(Number(setlistId));
  const hasNoMusic = setlistDetail.musics.length === 0;

  const [isEditMode, setIsEditMode] = useState(false);
  const [reorderedTracks, setReorderedTracks] = useState<SetListTrack[]>([]);

  const { mutate: startEditSetlist } = useStartEditSetList();
  const { mutate: completeEditSetList } = useCompleteEditSetList();
  const { mutate: reorderSetList } = useReorderSetList();

  const handleClickAdd = () => {
    navigate(buildPath(routePath.MY_HISTORY_ADD_SONGS_ABSOLUTE, { setlistId }));
  };

  const handleStartEdit = () => {
    startEditSetlist(Number(setlistId), {
      onSuccess: () => setIsEditMode(true),
    });
  };

  const handleCompleteEdit = () => {
    if (!setlistId || reorderedTracks.length === 0) return;

    const formatted = reorderedTracks.map((track, i) => ({
      trackId: track.trackId,
      orders: i + 1,
    }));

    reorderSetList(
      { setlistId: Number(setlistId), tracks: formatted },
      {
        onSuccess: () => {
          completeEditSetList(Number(setlistId), {
            onSuccess: () => setIsEditMode(false),
          });
        },
      },
    );
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
