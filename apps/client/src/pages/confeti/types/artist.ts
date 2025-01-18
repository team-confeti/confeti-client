import { ConcertArtist } from './concert';

export interface ArtistGridProps {
  artists: ConcertArtist[];
  dayId?: number;
  type: 'visible' | 'expanded';
}
