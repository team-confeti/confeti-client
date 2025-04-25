import { useRef } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

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
        // 요소를 복제하고 화면 밖에 배치할 임시 컨테이너 생성
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '-9999px';
        document.body.appendChild(container);

        // 요소 복제
        const clone = element.cloneNode(true) as HTMLElement;
        container.appendChild(clone);

        // 스타일 복사를 위한 함수
        const copyComputedStyles = (
          source: HTMLElement,
          target: HTMLElement,
        ) => {
          const sourceStyle = window.getComputedStyle(source);

          // 기본 레이아웃 스타일
          target.style.width = sourceStyle.width;
          target.style.overflow = 'visible';
          target.style.maxHeight = 'none';

          // 정확한 높이 복사 (원본 요소의 실제 높이)
          const rect = source.getBoundingClientRect();
          if (
            source.scrollHeight > source.clientHeight ||
            source.scrollWidth > source.clientWidth
          ) {
            target.style.height = 'auto';
          } else {
            target.style.height = `${rect.height}px`;
          }

          // 배경 관련 스타일 복사 및 강화
          target.style.backgroundColor = sourceStyle.backgroundColor;
          target.style.backgroundImage = sourceStyle.backgroundImage;
          target.style.backgroundSize = sourceStyle.backgroundSize;
          target.style.backgroundPosition = sourceStyle.backgroundPosition;
          target.style.backgroundRepeat = sourceStyle.backgroundRepeat;
          target.style.backgroundClip = 'padding-box';

          // 텍스트 스타일 복사
          target.style.color = sourceStyle.color;
          target.style.fontSize = sourceStyle.fontSize;
          target.style.fontFamily = sourceStyle.fontFamily;
          target.style.fontWeight = sourceStyle.fontWeight;
          target.style.fontStyle = sourceStyle.fontStyle;
          target.style.lineHeight = sourceStyle.lineHeight;
          target.style.textAlign = sourceStyle.textAlign;

          // 박스 모델 스타일
          target.style.boxSizing = 'border-box';
          target.style.margin = sourceStyle.margin;
          target.style.padding = sourceStyle.padding;
          target.style.border = sourceStyle.border;
          target.style.borderRadius = sourceStyle.borderRadius;

          // 포지셔닝 스타일
          target.style.position = sourceStyle.position;
          target.style.display = sourceStyle.display;
          target.style.flexDirection = sourceStyle.flexDirection;
          target.style.justifyContent = sourceStyle.justifyContent;
          target.style.alignItems = sourceStyle.alignItems;

          // 투명 배경 처리
          if (
            sourceStyle.backgroundColor === 'rgba(0, 0, 0, 0)' ||
            sourceStyle.backgroundColor === 'transparent'
          ) {
            let parentEl = source.parentElement;
            while (parentEl) {
              const parentStyle = window.getComputedStyle(parentEl);
              if (
                parentStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
                parentStyle.backgroundColor !== 'transparent'
              ) {
                target.style.backgroundColor = parentStyle.backgroundColor;
                break;
              }
              parentEl = parentEl.parentElement;
            }
          }
        };

        // 메인 요소 스타일 복사
        copyComputedStyles(element, clone);

        // 요소 내 모든 노드에 대해 스타일 복사
        const sourceElements = element.querySelectorAll('*');
        const targetElements = clone.querySelectorAll('*');

        for (
          let i = 0;
          i < sourceElements.length && i < targetElements.length;
          i++
        ) {
          copyComputedStyles(
            sourceElements[i] as HTMLElement,
            targetElements[i] as HTMLElement,
          );
        }

        // reflow 강제 트리거
        clone.offsetHeight;

        const scale = window.devicePixelRatio * 2;

        // 전체 크기 계산
        const fullHeight = Math.max(
          clone.scrollHeight,
          clone.offsetHeight,
          clone.clientHeight,
        );
        const fullWidth = Math.max(
          clone.scrollWidth,
          clone.offsetWidth,
          clone.clientWidth,
        );

        // 이미지 생성
        const blob = await domtoimage.toBlob(clone, {
          filter: (node: Node) => {
            const el = node as Element;
            return !excludeTags.includes(el.tagName);
          },
          quality: 1,
          height: fullHeight * scale,
          width: fullWidth * scale,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${fullWidth}px`,
            height: `${fullHeight}px`,
          },
        });

        // 임시 컨테이너 정리
        document.body.removeChild(container);

        saveAs(blob, fileName);
      } catch (error) {
        console.error('이미지 생성 실패:', error);
        // 오류 발생 시 임시 요소 정리
        const container = document.querySelector('div[style*="-9999px"]');
        if (container && container.parentElement) {
          container.parentElement.removeChild(container);
        }
        throw error;
      }
    }
  };

  return {
    elementRef,
    downloadImage,
  };
};
