import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { useRef } from 'react';

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
    if (element) {
      try {
        const scale = window.devicePixelRatio * 2;
        const blob = await domtoimage.toBlob(element, {
          filter: (node: Node) => {
            const element = node as Element;
            return !excludeTags.includes(element.tagName);
          },
          quality: 1,
          height: element.offsetHeight * scale,
          width: element.offsetWidth * scale,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${element.offsetWidth}px`,
            height: `${element.offsetHeight}px`,
          },
        });

        saveAs(blob, fileName);
      } catch (error) {
        console.error('Failed to generate image:', error);
        throw error;
      }
    }
  };

  return {
    elementRef,
    downloadImage,
  };
};
