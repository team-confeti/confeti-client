import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Footer } from '@confeti/design-system';
import Hero from '@shared/components/hero/hero';

import SetListHeader from '../../components/setlist-detail/setlist-detail-header';
import SetListEmpty from '../../components/setlist-detail/setlist-empty';
import SetListTracks from '../../components/setlist-detail/setlist-tracks';
import {
  useCompleteEditSetList,
  useSetListDetail,
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

  const { mutate: completeEditSetList } = useCompleteEditSetList();

  const handleClickAdd = () => {
    navigate(`/my-history/setlist/${setlistId}/add-songs`);
  };

  const handleGetDragHandleProps = (_musicId: string) => {
    return {}; //TODO: 드래그앤드랍 구현
  };

  const handleCompleteEdit = () => {
    if (!setlistId) return;
    completeEditSetList(Number(setlistId), {
      onSuccess: () => {
        setIsEditMode(false);
      },
    });
  };

  return (
    <>
      <Hero
        posterUrl={setlistDetail.posterUrl}
        posterBgUrl={setlistDetail.posterBgUrl}
        title={setlistDetail.title}
        startAt={setlistDetail.startAt}
        onClickBack={() => window.history.back()}
      />

      <SetListHeader
        isEditMode={isEditMode}
        showEditButton={!hasNoMusic}
        onClickToggleEdit={() => {
          if (isEditMode) {
            handleCompleteEdit();
          } else {
            setIsEditMode(true);
          }
        }}
      />

      {hasNoMusic ? (
        <SetListEmpty />
      ) : (
        <SetListTracks
          setlistId={setlistDetail.setlistId}
          tracks={setlistDetail.musics}
          isEditMode={isEditMode}
          onClickAdd={handleClickAdd}
          getDragHandleProps={handleGetDragHandleProps}
          onCompleteEdit={() => setIsEditMode(false)}
        />
      )}

      <Footer />
    </>
  );
};

export default SetListDetailPage;
