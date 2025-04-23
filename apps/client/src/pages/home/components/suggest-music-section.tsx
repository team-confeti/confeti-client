import { Box, MusicList } from '@confeti/design-system';
import { IcMusic } from '@confeti/design-system/icons';
import { MusicList as MusicListType } from '@shared/types/home-response';

const SuggestMusicSection = ({
  data,
  ref,
}: {
  data: MusicListType[];
  ref: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <Box
      title="미리 음악을 한 번 들어볼까요?"
      titleSize="lg"
      subtitle="인천 펜타포트 락 페스티벌"
      subtitleIcon={<IcMusic width="1.4rem" height="1.4rem" />}
    >
      <div ref={ref}>
        <MusicList musics={data} />
      </div>
    </Box>
  );
};

export default SuggestMusicSection;
