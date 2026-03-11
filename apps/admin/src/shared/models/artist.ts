import type { AdminArtistSearchResponse } from '@shared/types/api';

export type FormArtist = {
  id: number;
  name: string;
};

export const mapArtistSearchToFormArtist = (
  artist: AdminArtistSearchResponse,
): FormArtist => ({
  id: Number(artist.id),
  name: artist.name,
});
