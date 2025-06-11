import {
  ConcertCreateDTO,
  ConcertDetailDTO,
  ConcertListDTO,
  ReservationUrlRequestDTO,
} from '../types/api';

export type Artist = {
  artistId: string;
};

export type ReservationUrl = {
  reservationUrl: string;
  name: string;
  logoUrl: string;
  logoImg?: File;
};

export type Concert = {
  title: string;
  subtitle: string;
  posterUrl: string;
  posterImg?: File;
  startAt: Date;
  endAt: Date;
  area: string;
  reserveAt: Date;
  ageRating: string;
  time: string;
  price: string;
  address: string;
  artists: Artist[];
  reservationUrls: ReservationUrl[];
};

export type ConcertListItem = {
  concertId: number;
  title: string;
  subtitle: string;
  startAt: Date;
  area: string;
  reserveAt: Date;
};

export function toConcert(dto: ConcertDetailDTO): Concert {
  return {
    title: dto.concert.title,
    subtitle: dto.concert.subtitle,
    posterUrl: dto.concert.posterUrl,
    startAt: new Date(dto.concert.startAt),
    endAt: new Date(dto.concert.endAt),
    area: dto.concert.area,
    reserveAt: new Date(dto.concert.reserveAt),
    ageRating: dto.concert.ageRating,
    time: dto.concert.time,
    price: dto.concert.price,
    address: dto.concert.address,
    artists: dto.concert.artists,
    reservationUrls: dto.concert.reservationUrls.map((url) => ({
      ...url,
      logoUrl: url.logoUrl,
    })),
  };
}

export function toConcertListItem(
  dto: ConcertListDTO['concerts'][0],
): ConcertListItem {
  return {
    concertId: dto.concertId,
    title: dto.title,
    subtitle: dto.subtitle,
    startAt: new Date(dto.startAt),
    area: dto.area,
    reserveAt: new Date(dto.reserveAt),
  };
}

export function toConcertCreateDTO(concert: Concert): ConcertCreateDTO {
  if (!concert.posterImg) {
    throw new Error('포스터 이미지가 필요합니다.');
  }

  const reservationUrls = concert.reservationUrls.map((url) => {
    if (!url.logoImg) {
      throw new Error('예약 링크 로고 이미지가 필요합니다.');
    }
    return {
      reservationUrl: url.reservationUrl,
      name: url.name,
      logoImg: url.logoImg,
    } as ReservationUrlRequestDTO;
  });

  return {
    title: concert.title,
    subtitle: concert.subtitle,
    posterImg: concert.posterImg,
    startAt: concert.startAt.toISOString().split('T')[0], // yyyy-MM-dd
    endAt: concert.endAt.toISOString().split('T')[0], // yyyy-MM-dd
    area: concert.area,
    reserveAt: concert.reserveAt.toISOString(), // yyyy-MM-dd'T'HH:mm:ss
    ageRating: concert.ageRating,
    time: concert.time,
    price: concert.price,
    address: concert.address,
    artists: concert.artists,
    reservationUrls,
  };
}
