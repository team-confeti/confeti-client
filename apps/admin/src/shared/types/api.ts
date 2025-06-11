export type BaseResponse<T> = {
  status: number;
  message: string;
  data: T;
  code?: number;
};

export interface ErrorResponse {
  message?: string;
  code?: number;
}

export type ConcertListDTO = {
  concerts: {
    concertId: number;
    title: string;
    subtitle: string;
    startAt: string;
    area: string;
    reserveAt: string;
  }[];
};

export type ArtistDTO = {
  artistId: string;
};

export type ReservationUrlResponseDTO = {
  reservationUrl: string;
  name: string;
  logoUrl: string;
};

export type ReservationUrlRequestDTO = {
  reservationUrl: string;
  name: string;
  logoImg: File;
};

export type ConcertCreateDTO = {
  title: string;
  subtitle: string;
  posterImg: File;
  startAt: string;
  endAt: string;
  area: string;
  reserveAt: string;
  ageRating: string;
  time: string;
  price: string;
  address: string;
  artists: ArtistDTO[];
  reservationUrls: ReservationUrlRequestDTO[];
};

export type ConcertDetailDTO = {
  concert: {
    title: string;
    subtitle: string;
    posterUrl: string;
    startAt: string;
    endAt: string;
    area: string;
    reserveAt: string;
    ageRating: string;
    time: string;
    price: string;
    address: string;
    artists: ArtistDTO[];
    reservationUrls: ReservationUrlResponseDTO[];
  };
};
