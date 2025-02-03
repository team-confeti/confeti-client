export interface ConcertData {
  concertId: number;
  posterUrl: string;
  posterBgUrl: string;
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  area: string;
  reserveAt: string;
  reservationUrl: string;
  time: string;
  ageRating: string;
  reservationOffice: string;
  price: string;
  infoImgUrl: string;
  isFavorite: boolean;
}

export interface ConcertArtist {
  artistId: string;
  name: string;
  profileUrl: string;
}
