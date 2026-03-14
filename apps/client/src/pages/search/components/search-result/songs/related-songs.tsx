import { Box } from '@confeti/design-system';

import { logClickEvent } from '@shared/analytics/logging';
import { MusicList } from '@shared/components';
import { useMusicPlayer } from '@shared/hooks/use-music-player';
import { SongsRelatedToSearch } from '@shared/types/search-response';

import * as styles from './related-songs.css';

interface Props {
  relatedSongs: SongsRelatedToSearch[];
}

const RelatedSongs = ({ relatedSongs }: Props) => {
  const musics = relatedSongs.map((song) => ({
    musicId: String(song.songId),
    trackName: song.songName,
    artistName: song.artistName,
    artworkUrl: song.artworkUrl,
    previewUrl: song.previewUrl,
  }));

  const { musicList, onClickPlayToggle, audioRef, audioEvents } =
    useMusicPlayer(musics);

  const handleClickPlayToggle = (musicId: string) => {
    logClickEvent({
      name: 'click_music_play_toggle',
      params: {
        target_id: musicId,
        section: 'related_songs',
      },
    });
    onClickPlayToggle(musicId);
  };

  return (
    <div className={styles.section}>
      <Box title="연관 인기 음악">
        <MusicList
          musics={musicList}
          onClickPlayToggle={handleClickPlayToggle}
        />
        <audio
          ref={audioRef}
          onLoadedMetadata={audioEvents.onLoadedMetadata}
          onTimeUpdate={audioEvents.onTimeUpdate}
          onSeeked={audioEvents.onSeeked}
          onPlay={audioEvents.onPlay}
          onPause={audioEvents.onPause}
          onEnded={audioEvents.onEnded}
        />
      </Box>
    </div>
  );
};

export default RelatedSongs;
