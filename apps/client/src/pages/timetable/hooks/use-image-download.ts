import { useRef } from 'react';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';

interface UseImageDownloadOptions {
  fileName?: string;
  excludeTags?: string[];
}

export const useImageDownload = <T extends HTMLElement>({
  fileName = 'download',
  excludeTags = ['BUTTON'],
}: UseImageDownloadOptions = {}) => {
  const elementRef = useRef<T>(null);

  const downloadImage = async () => {
    const element = elementRef.current;
    if (!element) return;

    // 부모 중 overflow: hidden 제거
    const overflowFixTargets: [HTMLElement, string][] = [];
    let parent = element.parentElement;
    while (parent) {
      const computed = window.getComputedStyle(parent);
      if (computed.overflow === 'hidden') {
        overflowFixTargets.push([parent, parent.style.overflow]);
        parent.style.overflow = 'visible';
      }
      parent = parent.parentElement;
    }

    //  원래 스타일 저장
    const originalWidth = element.style.width;
    const originalOverflow = element.style.overflow;

    // 스크롤 전체 넓이 반영
    element.style.width = `${element.scrollWidth}px`;
    element.style.overflow = 'visible';

    try {
      const blob = await htmlToImage.toBlob(element, {
        filter: (node: Node) => {
          if (!(node instanceof HTMLElement)) return false;
          return !excludeTags.includes(node.tagName);
        },
      });

      if (!blob) throw new Error('Blob 생성 실패');
      saveAs(blob, fileName);
    } catch (error) {
      console.error('이미지 다운로드 실패:', error);
    } finally {
      // 스타일 복원
      element.style.width = originalWidth;
      element.style.overflow = originalOverflow;
      overflowFixTargets.forEach(([el, original]) => {
        el.style.overflow = original;
      });
    }
  };

  return {
    elementRef,
    downloadImage,
  };
};
