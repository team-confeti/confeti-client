import { useEffect, useRef, useState } from 'react';

import type { ExistingPerformance, PerformanceFormData } from '../types';

interface UsePerformanceFormProps {
  existingPerformance: ExistingPerformance | null;
}

const createInitialFormData = (
  existing: ExistingPerformance | null,
): PerformanceFormData => ({
  type: existing?.type || 'Festival',
  title: existing?.title || '',
  subtitle: existing?.subtitle || '',
  startDate: existing?.startDate || '',
  endDate: existing?.endDate || '',
  ageRating: existing?.ageRating || '전체 관람가',
  durationMinutes: existing?.durationMinutes ?? 120,
  bookingSchedules: existing?.bookingSchedules ?? [],
  selectedTicketingPlatforms: existing?.selectedTicketingPlatforms ?? [],
  venueName: existing?.venueName || '',
  venueAddress: existing?.venueAddress || '',
  priceGrades: existing?.priceGrades ?? [],
  mainPoster: null,
  logo: null,
  mainPosterPreview: existing?.mainPosterPreview ?? null,
  logoPreview: existing?.logoPreview ?? null,
  stages: existing?.stages ?? [],
  artists: existing?.artists ?? [],
  artistSearch: '',
  timetableSlots: existing?.timetableSlots ?? [],
  festivalDateMetas: existing?.festivalDateMetas ?? [],
  publishedPerformanceId: existing?.publishedPerformanceId ?? null,
});

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
}: UsePerformanceFormProps) => {
  const [formData, setFormData] = useState<PerformanceFormData>(() =>
    createInitialFormData(existingPerformance),
  );

  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (isInitializedRef.current || !existingPerformance) return;
    isInitializedRef.current = true;
    setFormData(createInitialFormData(existingPerformance));

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
  }, [existingPerformance]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    setFormData,
    handleInputChange,
  };
};
