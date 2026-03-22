import { useEffect, useRef, useState } from 'react';

import { generateDateRange } from '@shared/utils';

import type { ExistingPerformance, PerformanceFormData } from '../types';

interface UsePerformanceFormProps {
  existingPerformance: ExistingPerformance | null;
  initialPerformance?: ExistingPerformance | null;
  initialType?: 'Festival' | 'Concert';
}

const normalizeFestivalDateMetas = (
  festivalDateMetas: PerformanceFormData['festivalDateMetas'],
  festivalDates: string[],
) =>
  festivalDates.map(
    (date) =>
      festivalDateMetas.find(
        (festivalDateMeta) => festivalDateMeta.date === date,
      ) ?? { date, openAt: '' },
  );

const createInitialFormData = (
  existing: ExistingPerformance | null,
  initialPerformance?: ExistingPerformance | null,
  initialType?: 'Festival' | 'Concert',
): PerformanceFormData => {
  const type =
    existing?.type || initialPerformance?.type || initialType || 'Festival';
  const startDate = existing?.startDate || initialPerformance?.startDate || '';
  const endDate = existing?.endDate || initialPerformance?.endDate || '';
  const festivalDates =
    type === 'Festival' ? generateDateRange(startDate, endDate) : [];
  const initialFestivalDateMetas =
    existing?.festivalDateMetas ?? initialPerformance?.festivalDateMetas ?? [];
  const artists = (existing?.artists ?? initialPerformance?.artists ?? []).map(
    (artist) => {
      if (type !== 'Festival') {
        return artist;
      }

      const selectedFestivalDates =
        artist.festivalDates?.filter((date) => festivalDates.includes(date)) ??
        [];

      return {
        ...artist,
        festivalDates: selectedFestivalDates,
      };
    },
  );

  return {
    type,
    title: existing?.title || initialPerformance?.title || '',
    startDate,
    endDate,
    ageRating:
      existing?.ageRating || initialPerformance?.ageRating || '전체 관람가',
    durationMinutes:
      existing?.durationMinutes ?? initialPerformance?.durationMinutes ?? 120,
    bookingSchedules:
      existing?.bookingSchedules ?? initialPerformance?.bookingSchedules ?? [],
    selectedTicketingPlatforms:
      existing?.selectedTicketingPlatforms ??
      initialPerformance?.selectedTicketingPlatforms ??
      [],
    venueName: existing?.venueName || initialPerformance?.venueName || '',
    venueAddress:
      existing?.venueAddress || initialPerformance?.venueAddress || '',
    priceGrades: existing?.priceGrades ?? initialPerformance?.priceGrades ?? [],
    mainPoster: null,
    logo: null,
    mainPosterPreview:
      existing?.mainPosterPreview ??
      initialPerformance?.mainPosterPreview ??
      null,
    logoPreview:
      existing?.logoPreview ?? initialPerformance?.logoPreview ?? null,
    stages: existing?.stages ?? initialPerformance?.stages ?? [],
    artists,
    artistSearch: '',
    timetableSlots:
      existing?.timetableSlots ?? initialPerformance?.timetableSlots ?? [],
    festivalDateMetas:
      type === 'Festival'
        ? normalizeFestivalDateMetas(initialFestivalDateMetas, festivalDates)
        : [],
    publishedPerformanceId:
      existing?.publishedPerformanceId ??
      initialPerformance?.publishedPerformanceId ??
      null,
  };
};

const S3_BASE_URL = 'https://confeti-s3-prod.s3.ap-northeast-2.amazonaws.com';
const fetchImageAsFile = async (
  url: string,
  filename: string,
): Promise<File> => {
  const proxyUrl = url.startsWith(S3_BASE_URL)
    ? url.replace(S3_BASE_URL, '/s3-proxy')
    : url;
  const response = await fetch(proxyUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

export const usePerformanceForm = ({
  existingPerformance,
  initialPerformance,
  initialType,
}: UsePerformanceFormProps) => {
  const [formData, setFormData] = useState<PerformanceFormData>(() =>
    createInitialFormData(existingPerformance, initialPerformance, initialType),
  );

  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current || !existingPerformance) return;
    isInitializedRef.current = true;
    setFormData(createInitialFormData(existingPerformance, initialPerformance));

    const fetchExistingImages = async () => {
      const updates: Partial<PerformanceFormData> = {};

      if (existingPerformance.mainPosterPreview) {
        try {
          updates.mainPoster = await fetchImageAsFile(
            existingPerformance.mainPosterPreview,
            'poster.jpg',
          );
        } catch {
          // fetch failed — user will need to re-upload
        }
      }

      if (existingPerformance.logoPreview) {
        try {
          updates.logo = await fetchImageAsFile(
            existingPerformance.logoPreview,
            'logo.png',
          );
        } catch {
          // fetch failed — user will need to re-upload
        }
      }

      if (Object.keys(updates).length > 0) {
        setFormData((prev) => ({ ...prev, ...updates }));
      }
    };

    fetchExistingImages();
  }, [existingPerformance, initialPerformance]);

  useEffect(() => {
    if (formData.type !== 'Festival') {
      if (formData.festivalDateMetas.length === 0) {
        return;
      }

      setFormData((prev) =>
        prev.festivalDateMetas.length === 0
          ? prev
          : { ...prev, festivalDateMetas: [] },
      );
      return;
    }

    const festivalDates = generateDateRange(
      formData.startDate,
      formData.endDate,
    );

    setFormData((prev) => {
      const normalizedFestivalDateMetas = normalizeFestivalDateMetas(
        prev.festivalDateMetas,
        festivalDates,
      );

      const isFestivalDateMetasUnchanged =
        normalizedFestivalDateMetas.length === prev.festivalDateMetas.length &&
        normalizedFestivalDateMetas.every((festivalDateMeta, index) => {
          const prevFestivalDateMeta = prev.festivalDateMetas[index];

          return (
            prevFestivalDateMeta?.date === festivalDateMeta.date &&
            prevFestivalDateMeta?.openAt === festivalDateMeta.openAt &&
            prevFestivalDateMeta?.festivalDateId ===
              festivalDateMeta.festivalDateId
          );
        });

      return isFestivalDateMetasUnchanged
        ? prev
        : { ...prev, festivalDateMetas: normalizedFestivalDateMetas };
    });
  }, [formData.endDate, formData.startDate, formData.type]);

  useEffect(() => {
    if (formData.type !== 'Festival' || formData.artists.length === 0) {
      return;
    }

    const festivalDates = generateDateRange(
      formData.startDate,
      formData.endDate,
    );

    if (festivalDates.length === 0) {
      return;
    }

    setFormData((prev) => {
      const normalizedArtists = prev.artists.map((artist) => {
        const selectedFestivalDates =
          artist.festivalDates?.filter((date) =>
            festivalDates.includes(date),
          ) ?? [];

        return artist.festivalDates?.length === selectedFestivalDates.length
          ? artist
          : {
              ...artist,
              festivalDates: selectedFestivalDates,
            };
      });

      const hasUpdatedArtists = normalizedArtists.some(
        (artist, index) => artist !== prev.artists[index],
      );

      return hasUpdatedArtists ? { ...prev, artists: normalizedArtists } : prev;
    });
  }, [
    formData.endDate,
    formData.startDate,
    formData.type,
    formData.artists.length,
  ]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFestivalDateOpenAtChange = (date: string, openAt: string) => {
    setFormData((prev) => {
      const festivalDates = generateDateRange(prev.startDate, prev.endDate);
      const normalizedFestivalDateMetas = normalizeFestivalDateMetas(
        prev.festivalDateMetas,
        festivalDates,
      );
      const nextFestivalDateMetas = normalizedFestivalDateMetas.map(
        (festivalDateMeta) =>
          festivalDateMeta.date === date
            ? { ...festivalDateMeta, openAt }
            : festivalDateMeta,
      );

      const isUnchanged = nextFestivalDateMetas.every(
        (festivalDateMeta, index) =>
          festivalDateMeta.date === normalizedFestivalDateMetas[index]?.date &&
          festivalDateMeta.openAt ===
            normalizedFestivalDateMetas[index]?.openAt &&
          festivalDateMeta.festivalDateId ===
            normalizedFestivalDateMetas[index]?.festivalDateId,
      );

      return isUnchanged
        ? prev
        : { ...prev, festivalDateMetas: nextFestivalDateMetas };
    });
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    handleFestivalDateOpenAtChange,
  };
};
