import { Box } from '@confeti/design-system';
import { ArtistSearch } from '@shared/types/search-reponse';
import { formatDate } from '@shared/utils/format-date';

import ArtistInfo from './artist-info';

interface ArtistSectionProps {
  artist: ArtistSearch;
  refetchArtist?: () => void;
}

const ArtistSection = ({ artist, refetchArtist }: ArtistSectionProps) => {
  const formattedDate = formatDate(artist.latestReleaseAt);
  const artistCount = artist.artistId ? 1 : 0;

  return (
    <Box title={`아티스트 (${artistCount})`}>
      <ArtistInfo
        id={artist.artistId || ''}
        image={artist.profileUrl}
        name={artist.name}
        releaseDate={formattedDate}
        isFavorite={artist.isFavorite}
        refetchArtist={refetchArtist}
      />
    </Box>
  );
};

export default ArtistSection;
