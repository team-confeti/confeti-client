export interface FestivalArtist {
  artistId: string;
  name: string;
  profileUrl: string;
}

export interface FestivalDate {
  festivalDateId: number;
  festivalAt: string;
  isOpen: boolean;
  artists: FestivalArtist[];
}

export interface Festival {
  festivalId: number;
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

export interface FestivalDetailResponse {
  festival: Festival;
  festivalDates: FestivalDate[];
}
