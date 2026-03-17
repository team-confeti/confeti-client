const DEFAULT_ARTWORK_SIZE = 96;

export const getArtistArtworkUrl = (
  artworkUrl?: string,
  size = DEFAULT_ARTWORK_SIZE,
) => {
  if (!artworkUrl) {
    return undefined;
  }

  return artworkUrl.replace('{w}', String(size)).replace('{h}', String(size));
};
