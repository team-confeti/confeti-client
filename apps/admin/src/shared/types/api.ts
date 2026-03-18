// ===== Common =====
export type BaseResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export interface ErrorResponse {
  message?: string;
  code?: number;
}

// ===== Artist =====
export type ArtistResponse = {
  artistId: string;
  name: string;
  artworkUrl: string;
};

export type AdminArtistSearchResponse = {
  id: string;
  name: string;
  artworkUrl: string;
};

export type AdminArtistSearchResponses = {
  artists: AdminArtistSearchResponse[];
};

// ===== Reservation URL =====
export type ReservationUrlRequest = {
  ticketVendorId: number;
  reservationUrl: string;
};

export type ReservationUrlResponse = {
  reservationUrlId: number;
  reservationUrl: string;
  ticketVendorId: number;
};

// ===== Festival =====
// List
export type FestivalResponse = {
  festivalId: number;
  posterUrl: string;
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  area: string;
};

export type AdminPerformanceStatus = 'Scheduled' | 'Completed' | string;

export type AdminFestivalListItemResponse = FestivalResponse & {
  status?: AdminPerformanceStatus;
};

export type FestivalGroupResponse = {
  festivals: FestivalResponse[];
  count: number;
};

export type AdminFestivalListResponse = {
  upcomingFestivals: FestivalGroupResponse;
  finishedFestivals: FestivalGroupResponse;
};

export type AdminFestivalListQueryResponse = AdminFestivalListResponse;

// Detail
export type TimeResponse = {
  festivalTimeId: number;
  startAt: string;
  endAt: string;
  artists: ArtistResponse[];
};

export type StageResponse = {
  festivalStageId: number;
  name: string;
  order: number;
  times: TimeResponse[];
};

export type DateResponse = {
  festivalDateId: number;
  festivalAt: string;
  openAt: string;
  artists: ArtistResponse[];
  stages: StageResponse[];
};

export type AdminFestivalDetailResponse = {
  festivalId: number;
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  area: string;
  posterUrl: string;
  logoUrl: string;
  reserveAt: string;
  ageRating: string;
  time: string;
  price: string;
  address: string;
  timetableSupportStatus: 'NOT_SUPPORTED' | 'SUPPORTED';
  createdAt: string;
  updatedAt: string;
  dates: DateResponse[];
};

// Request
export type TimeRequest = {
  festivalTimeId?: number;
  startAt: string;
  endAt: string;
  name?: string;
  artistIds: string[];
};

export type StageRequest = {
  festivalStageId?: number;
  name: string;
  order: number;
  times: TimeRequest[];
};

export type DateRequest = {
  festivalDateId?: number;
  festivalAt: string;
  openAt: string;
  stages?: StageRequest[];
};

export type PutAdminFestivalRequest = {
  festivalId: number | null;
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  area: string;
  reserveAt: string;
  ageRating: string;
  time: string;
  price: string;
  address: string;
  reservationUrls: ReservationUrlRequest[];
  artistIds?: string[];
  dates?: DateRequest[];
};

export type PutAdminFestivalResponse = {
  festivalId: number;
};

// ===== Concert =====
// List
export type ConcertResponse = {
  concertId: number;
  posterUrl: string;
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  area: string;
};

export type AdminConcertListItemResponse = ConcertResponse & {
  status?: AdminPerformanceStatus;
};

export type ConcertGroupResponse = {
  concerts: ConcertResponse[];
  count: number;
};

export type AdminConcertListResponse = {
  upcomingConcerts: ConcertGroupResponse;
  finishedConcerts: ConcertGroupResponse;
};

export type AdminConcertListQueryResponse = AdminConcertListResponse;

// Detail
export type AdminConcertDetailResponse = {
  concertId: number;
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  area: string;
  posterUrl: string;
  reserveAt: string;
  ageRating: string;
  time: string;
  price: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  reservationUrls: ReservationUrlResponse[];
  artists: ArtistResponse[];
};

// Request
export type PutAdminConcertRequest = {
  concertId: number | null;
  title: string;
  subtitle: string;
  startAt: string;
  endAt: string;
  area: string;
  reserveAt: string;
  ageRating: string;
  time: string;
  price: string;
  address: string;
  artistIds: string[];
  reservationUrls: ReservationUrlRequest[];
};

export type PutAdminConcertResponse = {
  concertId: number;
};

// ===== Draft (대기 공연) =====
export type PerformanceDraftType = 'FESTIVAL' | 'CONCERT';

export type DraftStatus = '검토 필요' | '보류';

export type DraftListItem = {
  id: number;
  performanceType: PerformanceDraftType;
  status: DraftStatus;
  title: string;
  area: string;
  startAt: string;
  posterUrl?: string;
};

export type DraftListResponse = {
  drafts: DraftListItem[];
};

export type DraftListQueryResponse = DraftListResponse;

export type DraftDetailResponse = {
  id: number;
  performanceType: PerformanceDraftType;
  status: DraftStatus;
  title?: string;
  performanceData: string;
  posterUrl: string;
  logoUrl: string;
  artists: ArtistResponse[];
};

export type DraftResponse = {
  id: number;
  performanceType: PerformanceDraftType;
  status: DraftStatus;
  performanceData: string;
  posterUrl: string;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateDraftRequest = {
  performanceType: PerformanceDraftType;
  performanceData: string;
  posterImage: File;
  logoImage?: File;
};

export type UpdateDraftRequest = {
  performanceType?: PerformanceDraftType;
  status?: DraftStatus;
  performanceData?: string;
  posterImage?: File;
  logoImage?: File;
};

// ===== Ticket Vendor (예매처) =====
export type TicketVendorResponse = {
  id: number;
  name: string;
  logoPath: string;
};

export type TicketVendorListResponse = {
  ticketVendors: TicketVendorResponse[];
};

export type TicketVendorListQueryResponse = TicketVendorListResponse;

export type CreateTicketVendorRequest = {
  name: string;
  logoImage: File;
};

export type UpdateTicketVendorRequest = {
  name?: string;
  logoImage?: File;
};
