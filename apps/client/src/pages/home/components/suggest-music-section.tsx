import { Box, MusicList } from '@confeti/design-system';
import { MusicList as MusicListType } from '@shared/types/home-response';

const SuggestMusicSection = ({ data }: { data: MusicListType[] }) => {
  // TODO: response body에 고유한 id 값 추가 요청
  const musics = data.map((music, index) => ({
    ...music,
    id: `${music.title}-${index}`,
  }));

  return (
    <Box
      title="미리 음악을 한 번 들어볼까요?"
      titleSize="lg"
      subtitle="♥ 인천 펜타포트 락 페스티벌"
    >
      <MusicList musics={musics} />
    </Box>
  );
};

export default SuggestMusicSection;
