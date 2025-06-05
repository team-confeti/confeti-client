import { Box } from '@confeti/design-system';
import { ArtistSearch } from '@shared/types/search-reponse';

import ArtistInfo from './artist-info';

interface ArtistSectionProps {
  artist: ArtistSearch;
  refetchArtist?: () => void;
}

const ArtistSection = ({ artist, refetchArtist }: ArtistSectionProps) => {
  const artistCount = artist.artistId ? 1 : 0;

  return (
    <Box title={`아티스트 (${artistCount})`}>
      <ArtistInfo
        id={artist.artistId || ''}
        image={artist.profileUrl}
        name={artist.name}
        recentAlbumName={artist.recentAlbumName}
        isFavorite={artist.isFavorite}
        refetchArtist={refetchArtist}
      />
    </Box>
  );
};

export default ArtistSection;
