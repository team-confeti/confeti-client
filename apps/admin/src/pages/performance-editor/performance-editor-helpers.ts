import { z } from 'zod';

import type {
  PutAdminConcertRequest,
  PutAdminFestivalRequest,
} from '@shared/types/api';
import { generateDateRange } from '@shared/utils';

import type { PerformanceFormData, TimetableSlot } from './types';

const getPublishTargetType = (
  performanceType: string | null,
  formType: string,
): 'concert' | 'festival' =>
  performanceType === 'concert' || performanceType === 'festival'
    ? performanceType
    : formType === 'Festival'
      ? 'festival'
      : 'concert';

const hasFilledPriceGrade = (
  priceGrades: PerformanceFormData['priceGrades'],
): boolean =>
  priceGrades.some(
    (priceGrade) =>
      priceGrade.grade.trim().length > 0 && priceGrade.price.trim().length > 0,
  );

const formatPrice = (price: string) => {
  const numericPrice = price.replace(/\D/g, '');

  if (!numericPrice) {
    return '';
  }

  return `${Number(numericPrice).toLocaleString('ko-KR')}원`;
};

const withSeconds = (value: string) => {
  if (!value) {
    return value;
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(value)) {
    return value;
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) {
    return `${value}:00`;
  }

  return value;
};

const formatDateTime = (date: string, time: string) =>
  withSeconds(`${date}T${time}`);

const extractDate = (value: string) => value.split('T')[0] ?? value;

const extractTime = (value: string) =>
  value.split('T')[1]?.slice(0, 5) ?? value;

const getFestivalOpenAt = (date: string, slots: TimetableSlot[]) => {
  const earliestSlot = [...slots].sort((left, right) =>
    left.startTime.localeCompare(right.startTime),
  )[0];

  return formatDateTime(date, earliestSlot?.startTime ?? '00:00');
};

const getFestivalDates = (
  formData: PerformanceFormData,
): PutAdminFestivalRequest['dates'] => {
  const days = generateDateRange(formData.startDate, formData.endDate);

  if (days.length === 0) {
    return [];
  }

  return days.map((date) => {
    const festivalDateMeta = formData.festivalDateMetas.find(
      (meta) => meta.date === date,
    );
    const slotsForDate = formData.timetableSlots.filter(
      (slot) => slot.date === date,
    );
    const stages = formData.stages
      .map((stage, stageIndex) => ({
        festivalStageId: stage.festivalStageId,
        name: stage.name,
        order: stage.order ?? stageIndex,
        times: slotsForDate
          .filter((slot) => slot.stageIndex === stageIndex)
          .map((slot) => ({
            festivalTimeId: slot.festivalTimeId,
            startAt: formatDateTime(date, slot.startTime),
            endAt: formatDateTime(date, slot.endTime),
            artistIds: [String(slot.artistId)],
          })),
      }))
      .filter((stage) => stage.times.length > 0);

    return {
      festivalDateId: festivalDateMeta?.festivalDateId,
      festivalAt: date,
      openAt: festivalDateMeta?.openAt
        ? formatDateTime(date, festivalDateMeta.openAt)
        : getFestivalOpenAt(date, slotsForDate),
      artistIds: formData.artists
        .filter((artist) => artist.festivalDates?.includes(date) ?? false)
        .map((artist) => String(artist.id)),
      stages: stages.length > 0 ? stages : undefined,
    };
  });
};

const performanceDateSchema = z
  .string()
  .trim()
  .min(1, '공연 일정을 입력해주세요.')
  .regex(/^\d{4}-\d{2}-\d{2}$/, '공연 일정 형식이 올바르지 않아요.');

const reservationDateTimeSchema = z
  .string()
  .trim()
  .min(1, '예매 일정을 입력해주세요.')
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/,
    '예매 일정 형식이 올바르지 않아요.',
  );

const festivalOpenAtSchema = z
  .string()
  .trim()
  .min(1, '티켓 오픈 시간을 입력해주세요.')
  .regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/,
    '티켓 오픈 시간 형식이 올바르지 않아요.',
  );

const reservationScheduleSchema = z.object({
  roundName: z.string().trim().max(30, '예매 차수는 30자 이하여야 해요.'),
  reserveAt: reservationDateTimeSchema,
});

const concertRequestSchema = z.object({
  concertId: z.number().nullable(),
  title: z.string().trim().min(1, '공연명을 입력해주세요.'),
  startAt: performanceDateSchema,
  endAt: performanceDateSchema,
  area: z.string().trim().min(1, '장소 정보를 입력해주세요.'),
  address: z.string().trim().min(1, '장소 정보를 입력해주세요.'),
  ageRating: z.string().trim().min(1, '관람 등급을 입력해주세요.'),
  time: z.string().trim().min(1, '공연 시간을 입력해주세요.'),
  price: z.string().trim().min(1, '가격 등급과 가격을 하나 이상 입력해주세요.'),
  artistIds: z
    .array(z.string().trim().min(1))
    .min(1, '아티스트를 한 명 이상 추가해주세요.'),
  reservationSchedules: z
    .array(reservationScheduleSchema)
    .min(1, '예매 일정을 입력해주세요.'),
  reservationUrls: z.array(
    z.object({
      ticketVendorId: z.number(),
      reservationUrl: z.string().url('올바른 예매 URL을 입력해주세요.'),
    }),
  ),
});

const festivalTimeSchema = z.object({
  festivalTimeId: z.number().optional(),
  startAt: reservationDateTimeSchema,
  endAt: reservationDateTimeSchema,
  artistIds: z
    .array(z.string().trim().min(1))
    .min(1, '타임테이블에 아티스트를 추가해주세요.'),
});

const festivalStageSchema = z.object({
  festivalStageId: z.number().optional(),
  name: z.string().trim().min(1, '스테이지 이름을 입력해주세요.'),
  order: z.number(),
  times: z.array(festivalTimeSchema),
});

const festivalDateSchema = z.object({
  festivalDateId: z.number().optional(),
  festivalAt: performanceDateSchema,
  openAt: festivalOpenAtSchema,
  artistIds: z.array(z.string().trim().min(1)).optional(),
  stages: z.array(festivalStageSchema).optional(),
});

const festivalRequestSchema = z.object({
  festivalId: z.number().nullable(),
  title: z.string().trim().min(1, '공연명을 입력해주세요.'),
  startAt: performanceDateSchema,
  endAt: performanceDateSchema,
  area: z.string().trim().min(1, '장소 정보를 입력해주세요.'),
  address: z.string().trim().min(1, '장소 정보를 입력해주세요.'),
  ageRating: z.string().trim().min(1, '관람 등급을 입력해주세요.'),
  time: z.string().trim().min(1, '공연 시간을 입력해주세요.'),
  price: z.string().trim().min(1, '가격 등급과 가격을 하나 이상 입력해주세요.'),
  reservationSchedules: z
    .array(reservationScheduleSchema)
    .min(1, '예매 일정을 입력해주세요.'),
  reservationUrls: z.array(
    z.object({
      ticketVendorId: z.number(),
      reservationUrl: z.string().url('올바른 예매 URL을 입력해주세요.'),
    }),
  ),
  dates: z.array(festivalDateSchema).optional(),
});

const getFirstZodIssueMessage = (error: z.ZodError) =>
  error.issues[0]?.message ?? '입력값을 다시 확인해주세요.';

export const getConcertRequestValidationMessage = (
  request: PutAdminConcertRequest,
) => {
  const result = concertRequestSchema.safeParse(request);

  if (!result.success) {
    return getFirstZodIssueMessage(result.error);
  }

  if (request.endAt < request.startAt) {
    return '종료일은 시작일보다 빠를 수 없어요.';
  }

  return null;
};

export const getFestivalRequestValidationMessage = (
  request: PutAdminFestivalRequest,
) => {
  const result = festivalRequestSchema.safeParse(request);

  if (!result.success) {
    return getFirstZodIssueMessage(result.error);
  }

  if (request.endAt < request.startAt) {
    return '종료일은 시작일보다 빠를 수 없어요.';
  }

  const hasFestivalLineup =
    request.dates?.some((date) => (date.artistIds?.length ?? 0) > 0) ?? false;

  if (!hasFestivalLineup) {
    return '아티스트를 한 명 이상 추가해주세요.';
  }

  return null;
};

export const getPublishValidationMessage = (
  formData: PerformanceFormData,
  performanceType: string | null,
): string | null => {
  const publishTargetType = getPublishTargetType(
    performanceType,
    formData.type,
  );

  if (!formData.title.trim()) {
    return '공연명을 입력해주세요.';
  }

  if (!formData.startDate || !formData.endDate) {
    return '공연 일정을 입력해주세요.';
  }

  if (formData.endDate < formData.startDate) {
    return '종료일은 시작일보다 빠를 수 없어요.';
  }

  if (!formData.venueName.trim() || !formData.venueAddress.trim()) {
    return '장소 정보를 입력해주세요.';
  }

  if (
    !formData.bookingSchedules.some(
      (bookingSchedule) => bookingSchedule.startDate.trim().length > 0,
    )
  ) {
    return '예매 일정을 입력해주세요.';
  }

  if (!hasFilledPriceGrade(formData.priceGrades)) {
    return '가격 등급과 가격을 하나 이상 입력해주세요.';
  }

  if (!formData.mainPoster && !formData.mainPosterPreview) {
    return '포스터 이미지를 등록해주세요.';
  }

  if (
    publishTargetType === 'festival' &&
    !formData.logo &&
    !formData.logoPreview
  ) {
    return '페스티벌 로고를 등록해주세요.';
  }

  return null;
};

export const buildDraftPerformanceData = (formData: PerformanceFormData) =>
  JSON.stringify({
    type: formData.type,
    title: formData.title,
    startDate: formData.startDate,
    endDate: formData.endDate,
    venueName: formData.venueName,
    venueAddress: formData.venueAddress,
    ageRating: formData.ageRating,
    durationMinutes: formData.durationMinutes,
    bookingSchedules: formData.bookingSchedules,
    priceGrades: formData.priceGrades,
    artists: formData.artists,
    selectedTicketingPlatforms: formData.selectedTicketingPlatforms,
    stages: formData.stages,
    timetableSlots: formData.timetableSlots,
    festivalDateMetas: formData.festivalDateMetas,
    publishedPerformanceId: formData.publishedPerformanceId,
  });

const getReservationSchedules = (
  bookingSchedules: PerformanceFormData['bookingSchedules'],
) =>
  bookingSchedules
    .filter((schedule) => schedule.startDate.trim().length > 0)
    .map((schedule) => ({
      roundName: schedule.round.trim(),
      reserveAt: withSeconds(schedule.startDate),
    }));

export const buildConcertRequest = (
  formData: PerformanceFormData,
  concertId?: number,
): PutAdminConcertRequest => ({
  concertId: concertId ?? null,
  title: formData.title,
  startAt: formData.startDate,
  endAt: formData.endDate,
  area: formData.venueName,
  address: formData.venueAddress,
  ageRating: formData.ageRating,
  time: `${formData.durationMinutes}분`,
  price: formData.priceGrades
    .filter(
      (priceGrade) =>
        priceGrade.grade.trim().length > 0 &&
        priceGrade.price.trim().length > 0,
    )
    .map((priceGrade) => `${priceGrade.grade} ${formatPrice(priceGrade.price)}`)
    .join(' / '),
  artistIds: formData.artists.map((artist) => String(artist.id)),
  reservationUrls: formData.selectedTicketingPlatforms
    .filter((ticketVendor) => ticketVendor.url.trim().length > 0)
    .map((ticketVendor) => ({
      ticketVendorId: ticketVendor.id,
      reservationUrl: ticketVendor.url,
    })),
  reservationSchedules: getReservationSchedules(formData.bookingSchedules),
});

export const buildFestivalRequest = (
  formData: PerformanceFormData,
  festivalId?: number,
): PutAdminFestivalRequest => ({
  festivalId: festivalId ?? null,
  title: formData.title,
  startAt: formData.startDate,
  endAt: formData.endDate,
  area: formData.venueName,
  address: formData.venueAddress,
  ageRating: formData.ageRating,
  time: `${formData.durationMinutes}분`,
  price: formData.priceGrades
    .filter(
      (priceGrade) =>
        priceGrade.grade.trim().length > 0 &&
        priceGrade.price.trim().length > 0,
    )
    .map((priceGrade) => `${priceGrade.grade} ${formatPrice(priceGrade.price)}`)
    .join(' / '),
  reservationUrls: formData.selectedTicketingPlatforms
    .filter((ticketVendor) => ticketVendor.url.trim().length > 0)
    .map((ticketVendor) => ({
      ticketVendorId: ticketVendor.id,
      reservationUrl: ticketVendor.url,
    })),
  reservationSchedules: getReservationSchedules(formData.bookingSchedules),
  dates: getFestivalDates(formData),
});

export const getSubmitButtonText = (
  formData: PerformanceFormData,
  performanceType: string | null,
  isNew: boolean,
) => {
  if (performanceType) {
    return '저장';
  }

  return getPublishValidationMessage(formData, performanceType) === null
    ? '저장 및 게시'
    : isNew
      ? '임시 저장'
      : '저장';
};

export const getPublishedPerformanceId = (
  performanceType: string | null,
  routeId: string | undefined,
  formData: PerformanceFormData,
) => {
  if (performanceType && routeId && Number.isFinite(Number(routeId))) {
    return Number(routeId);
  }

  return formData.publishedPerformanceId ?? undefined;
};

export const normalizeFestivalDateMetas = (
  festivalDateMetas: PerformanceFormData['festivalDateMetas'],
) =>
  festivalDateMetas.map((festivalDateMeta) => ({
    ...festivalDateMeta,
    date: extractDate(festivalDateMeta.date),
    openAt: festivalDateMeta.openAt
      ? extractTime(festivalDateMeta.openAt)
      : festivalDateMeta.openAt,
  }));
