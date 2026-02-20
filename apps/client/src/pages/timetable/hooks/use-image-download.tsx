import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';

import TimetableCapture from '@pages/timetable/components/timetable-capture/timetable-capture';
import {
  CAPTURE_HEIGHT,
  CAPTURE_WIDTH,
} from '@pages/timetable/constants/capture';
import { TimetableInfo } from '@pages/timetable/types/timetable-info-type';

const S3_HOST = 'https://confeti-s3-prod.s3.ap-northeast-2.amazonaws.com';

function toProxiedUrl(url: string): string {
  if (url.startsWith(S3_HOST)) {
    return url.replace(S3_HOST, '/s3-proxy');
  }
  return url;
}

async function fetchImageAsDataUrl(url: string): Promise<string> {
  try {
    const response = await fetch(toProxiedUrl(url));
    const blob = await response.blob();
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve('');
      reader.readAsDataURL(blob);
    });
  } catch {
    return '';
  }
}

interface UseImageDownloadOptions {
  fileName: string;
  boardData: TimetableInfo | null;
  posterUrl: string;
  festivalTitle: string;
  festivalDate: string;
  dayNumber: number;
}

interface UseImageDownloadReturn {
  downloadImage: () => Promise<{ success: boolean; message: string }>;
  CaptureElement: ReactNode;
}

export const useImageDownload = ({
  fileName,
  boardData,
  posterUrl,
  festivalTitle,
  festivalDate,
  dayNumber,
}: UseImageDownloadOptions): UseImageDownloadReturn => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [posterDataUrl, setPosterDataUrl] = useState<string>('');

  useEffect(() => {
    if (!posterUrl) {
      setPosterDataUrl('');
      return;
    }
    fetchImageAsDataUrl(posterUrl).then(setPosterDataUrl);
  }, [posterUrl]);

  const downloadImage = useCallback(async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    if (!captureRef.current || !boardData) {
      return {
        success: false,
        message: '이미지를 생성할 요소를 찾을 수 없습니다.',
      };
    }

    try {
      // Wait for images to load
      const images = captureRef.current.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                img.onload = () => resolve();
                img.onerror = () => resolve();
              }),
        ),
      );

      const dataUrl = await toPng(captureRef.current, {
        width: CAPTURE_WIDTH,
        height: CAPTURE_HEIGHT,
        pixelRatio: 2,
        skipAutoScale: true,
        skipFonts: true,
        cacheBust: false,
        backgroundColor: '#ffffff',
        imagePlaceholder: '',
        includeQueryParams: false,
      });

      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return {
        success: true,
        message: '이미지가 성공적으로 저장되었습니다.',
      };
    } catch (error) {
      console.error('이미지 생성 중 오류:', error);

      return {
        success: false,
        message: '이미지 저장 중 오류가 발생했습니다.',
      };
    }
  }, [boardData, fileName]);

  const CaptureElement: ReactNode = boardData ? (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <TimetableCapture
        ref={captureRef}
        boardData={boardData}
        posterUrl={posterDataUrl}
        festivalTitle={festivalTitle}
        festivalDate={festivalDate}
        dayNumber={dayNumber}
      />
    </div>
  ) : null;

  return { downloadImage, CaptureElement };
};
