import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';

import TimetableCapture from '@pages/timetable/components/timetable-capture/timetable-capture';
import {
  CAPTURE_HEIGHT,
  CAPTURE_WIDTH,
} from '@pages/timetable/constants/capture';
import { TimetableInfo } from '@pages/timetable/types/timetable-info-type';
import {
  fetchImageAsDataUrl,
  triggerDownload,
  waitForImages,
} from '@pages/timetable/utils/capture';

import * as captureStyles from '@pages/timetable/components/timetable-capture/timetable-capture.css';

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
      await waitForImages(captureRef.current);

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

      triggerDownload(dataUrl, fileName);

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
    <div className={captureStyles.offscreenWrapper}>
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
