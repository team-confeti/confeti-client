export interface Festival {
  festivalId: number;
  title: string;
  subtitle: string;
  startAt: string;
  area: string;
  reserveAt: string;
}

export interface FestivalListResponse {
  status: number;
  message: string;
  data: {
    festivals: Festival[];
  };
}

export interface FestivalDetail {
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
  artists: {
    artistId: string;
  }[];
  reservationUrls: {
    reservationUrl: string;
    name: string;
    logoUrl: string;
  }[];
}

export interface FestivalDetailResponse {
  status: number;
  message: string;
  data: {
    concert: FestivalDetail;
  };
}
