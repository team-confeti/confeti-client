export type BaseResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export interface ErrorResponse {
  message?: string;
  code?: number;
}

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

export type FestivalListDTO = {
  festivals: {
    festivalId: number;
    title: string;
    subtitle: string;
    startAt: string;
    area: string;
    reserveAt: string;
  }[];
};

export type FestivalDetailDTO = {
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

type FestivalStageTimeDTO = {
  startAt: string;
  endAt: string;
  artists: {
    artistId: string;
  }[];
};

type FestivalStageDTO = {
  name: string;
  order: number;
  times: FestivalStageTimeDTO[];
};

type FestivalDateDTO = {
  festivalAt: string;
  openAt: string;
  stages: FestivalStageDTO[];
};

export type FestivalCreateDTO = {
  title: string;
  subtitle: string;
  posterImg: File;
  logoImg: File;
  startAt: string;
  endAt: string;
  area: string;
  reserveAt: string;
  ageRating: string;
  time: string;
  price: string;
  address: string;
  dates: FestivalDateDTO[];
  reservationUrls: ReservationUrlRequestDTO[];
};

export type FestivalUpdateDTO = Partial<FestivalCreateDTO>;
