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
    return undefined;
  }

  return days.map((date) => {
    const festivalDateMeta = formData.festivalDateMetas.find(
      (meta) => meta.date === date,
    );
    const slotsForDate = formData.timetableSlots.filter(
      (slot) => slot.date === date,
    );

    return {
      festivalDateId: festivalDateMeta?.festivalDateId,
      festivalAt: date,
      openAt: festivalDateMeta?.openAt
        ? formatDateTime(date, festivalDateMeta.openAt)
        : getFestivalOpenAt(date, slotsForDate),
      stages:
        formData.stages.length > 0
          ? formData.stages.map((stage, stageIndex) => ({
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
          : undefined,
    };
  });
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
    subtitle: formData.subtitle,
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

export const buildConcertRequest = (
  formData: PerformanceFormData,
  concertId?: number,
): PutAdminConcertRequest => ({
  concertId: concertId ?? null,
  title: formData.title,
  subtitle: formData.subtitle,
  startAt: formData.startDate,
  endAt: formData.endDate,
  area: formData.venueName,
  address: formData.venueAddress,
  reserveAt: withSeconds(formData.bookingSchedules[0]?.startDate ?? ''),
  ageRating: formData.ageRating,
  time: `${formData.durationMinutes}분`,
  price: formData.priceGrades
    .filter(
      (priceGrade) =>
        priceGrade.grade.trim().length > 0 &&
        priceGrade.price.trim().length > 0,
    )
    .map((priceGrade) => `${priceGrade.grade} ${priceGrade.price}`)
    .join(' / '),
  artistIds: formData.artists.map((artist) => String(artist.id)),
  reservationUrls: formData.selectedTicketingPlatforms
    .filter((ticketVendor) => ticketVendor.url.trim().length > 0)
    .map((ticketVendor) => ({
      ticketVendorId: ticketVendor.id,
      reservationUrl: ticketVendor.url,
    })),
});

export const buildFestivalRequest = (
  formData: PerformanceFormData,
  festivalId?: number,
): PutAdminFestivalRequest => ({
  festivalId: festivalId ?? null,
  title: formData.title,
  subtitle: formData.subtitle,
  startAt: formData.startDate,
  endAt: formData.endDate,
  area: formData.venueName,
  address: formData.venueAddress,
  reserveAt: withSeconds(formData.bookingSchedules[0]?.startDate ?? ''),
  ageRating: formData.ageRating,
  time: `${formData.durationMinutes}분`,
  price: formData.priceGrades
    .filter(
      (priceGrade) =>
        priceGrade.grade.trim().length > 0 &&
        priceGrade.price.trim().length > 0,
    )
    .map((priceGrade) => `${priceGrade.grade} ${priceGrade.price}`)
    .join(' / '),
  reservationUrls: formData.selectedTicketingPlatforms
    .filter((ticketVendor) => ticketVendor.url.trim().length > 0)
    .map((ticketVendor) => ({
      ticketVendorId: ticketVendor.id,
      reservationUrl: ticketVendor.url,
    })),
  artistIds: formData.artists.map((artist) => String(artist.id)),
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
