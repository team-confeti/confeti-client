import type { TimetableInfo } from '@pages/timetable/types/timetable-info-type';

import { calcTotalMinutes, parseTimeString } from '.';

const S3_HOST = 'https://confeti-s3-prod.s3.ap-northeast-2.amazonaws.com';

// ── Types ──

export interface ArtistEntry {
  name: string;
  totalMin: number;
  startHour: string;
  startMin: string;
  endHour: string;
  endMin: string;
}

// ── Data Transformation ──

/** 선택된 아티스트를 시작 시간순으로 정렬하여 반환 */
export const collectSelectedArtists = (
  stages: TimetableInfo['stages'],
): ArtistEntry[] => {
  const entries: ArtistEntry[] = [];

  for (const stage of stages) {
    for (const block of stage.festivalTimes) {
      if (!block.isSelected) continue;

      const [sh, sm] = parseTimeString(block.startAt);
      const [eh, em] = parseTimeString(block.endAt);

      entries.push({
        name: block.artists.map((a) => a.artistName).join(', '),
        totalMin: calcTotalMinutes(sh, sm, eh, em),
        startHour: sh,
        startMin: sm,
        endHour: eh,
        endMin: em,
      });
    }
  }

  return entries.sort((a, b) => {
    const aMin = Number(a.startHour) * 60 + Number(a.startMin);
    const bMin = Number(b.startHour) * 60 + Number(b.startMin);
    return aMin - bMin;
  });
};

// ── Image Proxy ──

/** S3 이미지 URL을 프록시 URL로 변환 (CORS 우회) */
export const toProxiedUrl = (url: string): string => {
  if (url.startsWith(S3_HOST)) {
    return url.replace(S3_HOST, '/s3-proxy');
  }
  return url;
};

/** 외부 이미지를 data URL로 변환 (html-to-image CORS 대응) */
export const fetchImageAsDataUrl = async (url: string): Promise<string> => {
  try {
    const response = await fetch(toProxiedUrl(url));
    const blob = await response.blob();

    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
};

// ── DOM Helpers ──

/** 컨테이너 내 모든 이미지 로드 대기 */
export const waitForImages = (container: HTMLElement): Promise<void[]> =>
  Promise.all(
    Array.from(container.querySelectorAll('img')).map((img) =>
      img.complete
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }),
    ),
  );

// ── Download ──

const isMobile = (): boolean =>
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const triggerDownload = async (
  dataUrl: string,
  fileName: string,
): Promise<void> => {
  const fullName = `${fileName}.png`;

  const blob = await (await fetch(dataUrl)).blob();
  const file = new File([blob], fullName, { type: 'image/png' });

  if (isMobile() && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch {
      // 공유 취소 시 다운로드로 폴백
    }
  }

  const link = document.createElement('a');
  link.download = fullName;
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
