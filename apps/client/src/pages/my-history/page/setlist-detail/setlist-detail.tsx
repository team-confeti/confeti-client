import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Footer } from '@confeti/design-system';
import { SETLIST_QUERY_OPTION } from '@shared/apis/my-history/setlist-queries';
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
  useStartEditSetList,
} from '../../hooks/use-setlist-detail-mutation';

const SetListDetailPage = () => {
  const { setlistId } = useParams<{ setlistId: string }>();
  const navigate = useNavigate();
  if (!setlistId) {
    throw new Error('잘못된 접근입니다. (setlistId 없음)');
  }
  const { data: setlistDetail } = useSuspenseQuery(
    SETLIST_QUERY_OPTION.DETAIL(Number(setlistId)),
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const [reorderedTracks, setReorderedTracks] = useState<SetListTrack[]>([]);
  const hasNoMusic = setlistDetail.musics.length === 0;
  const hasNoReorderedTracks = reorderedTracks.length === 0;

  const formatTracksWithOrder = (tracks: SetListTrack[]) => {
    return tracks.map((track, index) => ({
      musicId: track.musicId,
      orders: index + 1,
    }));
  };

  const handleStartEdit = () => {
    startEditSetlist(Number(setlistId));
  };

  const handleStartEditSuccess = () => {
    setIsEditMode(true);
  };

  const handleCompleteEditSuccess = () => {
    setIsEditMode(false);
  };
  const handleCompleteEdit = () => {
    if (hasNoReorderedTracks) return;
    const formatted = formatTracksWithOrder(reorderedTracks);
    reorderSetList({ setlistId: Number(setlistId), tracks: formatted });
    completeEditSetList(Number(setlistId));
  };
  const handleClickAdd = () => {
    navigate(buildPath(routePath.MY_HISTORY_ADD_SONGS_ABSOLUTE, { setlistId }));
  };

  const { mutate: startEditSetlist } = useStartEditSetList(
    handleStartEditSuccess,
  );
  const { mutate: completeEditSetList } = useCompleteEditSetList(
    handleCompleteEditSuccess,
  );
  const { mutate: reorderSetList } = useReorderSetList();

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
