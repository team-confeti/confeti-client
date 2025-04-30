import { useQuery } from '@tanstack/react-query';

import { SETLIST_QUERY_OPTION } from '@shared/apis/my-history/setlist-queries';
import {
  ArtistMusicSearchRequest,
  MusicSearchRequest,
} from '@shared/types/my-history-response';

export const useMusicSearch = (
  request: MusicSearchRequest,
  enabled: boolean,
) => {
  return useQuery({ ...SETLIST_QUERY_OPTION.SEARCH_MUSIC(request, enabled) });
};

export const useArtistMusicSearch = (
  request: ArtistMusicSearchRequest,
  enabled: boolean,
) => {
  return useQuery({
    ...SETLIST_QUERY_OPTION.SEARCH_ARTIST_MUSIC(request, enabled),
  });
};
