import { FestivalDetailDTO, FestivalListDTO } from '../types/api';

type Artist = {
  artistId: string;
};

type ReservationUrl = {
  reservationUrl: string;
  name: string;
  logoUrl: string;
  logoImg?: File;
};

export type FestivalListItem = {
  id: number;
  title: string;
  subtitle: string;
  startAt: Date;
  area: string;
  reserveAt: Date;
};

export type Festival = {
  title: string;
  subtitle: string;
  posterImg?: File;
  logoImg?: File;
  posterUrl: string;
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

export function toFestivalListItem(
  dto: FestivalListDTO['festivals'][0],
): FestivalListItem {
  return {
    id: dto.festivalId,
    title: dto.title,
    subtitle: dto.subtitle,
    startAt: new Date(dto.startAt),
    area: dto.area,
    reserveAt: new Date(dto.reserveAt),
  };
}

export function toFestival(dto: FestivalDetailDTO): Festival {
  return {
    title: dto.title,
    subtitle: dto.subtitle,
    posterUrl: dto.posterUrl,
    startAt: new Date(dto.startAt),
    endAt: new Date(dto.endAt),
    area: dto.area,
    reserveAt: new Date(dto.reserveAt),
    ageRating: dto.ageRating,
    time: dto.time,
    price: dto.price,
    address: dto.address,
    artists: dto.artists,
    reservationUrls: dto.reservationUrls.map((url) => ({
      ...url,
      logoUrl: url.logoUrl,
    })),
  };
}
