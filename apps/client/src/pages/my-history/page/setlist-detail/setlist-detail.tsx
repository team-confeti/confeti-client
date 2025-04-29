import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Footer } from '@confeti/design-system';
import Hero from '@shared/components/hero/hero';

import SetListHeader from '../../components/setlist-detail/setlist-detail-header';
import SetListEmpty from '../../components/setlist-detail/setlist-empty';
import SetListTracks from '../../components/setlist-detail/setlist-tracks';
import { useSetListDetail } from '../../hooks/use-setlist-detail';

const SetListDetailPage = () => {
  const { setlistId } = useParams<{ setlistId: string }>();

  if (!setlistId) {
    throw new Error('잘못된 접근입니다. (setlistId 없음)');
  }

  const { data: setlistDetail } = useSetListDetail(Number(setlistId));
  const hasNoMusic = setlistDetail.musics.length === 0;

  const [isEditMode, setIsEditMode] = useState(false);

  const handleClickAdd = () => {
    console.log('곡 추가하기 버튼 클릭');
  };

  const handleGetDragHandleProps = (musicId: string) => {
    return {}; // dnd kit 등 쓰면 여기 props 반환
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
        onClickToggleEdit={() => setIsEditMode((prev) => !prev)}
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
        />
      )}

      <Footer />
    </>
  );
};

export default SetListDetailPage;
