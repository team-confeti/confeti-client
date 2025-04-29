import { useRef } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

interface UseImageDownloadOptions {
  fileName?: string;
  excludeTags?: string[];
  timeTableItemSelector?: string;
}

export const useImageDownload = <T extends HTMLElement>({
  fileName = 'download',
  excludeTags = ['BUTTON'],
  timeTableItemSelector = '.time-table-item',
}: UseImageDownloadOptions = {}) => {
  const elementRef = useRef<T>(null);

  const downloadImage = async () => {
    const element = elementRef.current;
    if (element) {
      try {
        // 원래 스타일 저장
        const originalStyles = new Map();
        const originalContents = new Map();

        // 타임테이블 아이템 요소들 찾기
        const timeTableItems = element.querySelectorAll(timeTableItemSelector);
        timeTableItems.forEach((item) => {
          const htmlItem = item as HTMLElement;
          originalStyles.set(htmlItem, {
            overflow: htmlItem.style.overflow,
            textOverflow: htmlItem.style.textOverflow,
            whiteSpace: htmlItem.style.whiteSpace,
            display: htmlItem.style.display,
            width: htmlItem.style.width,
          });

          // 말줄임표가 필요한 텍스트 요소들 찾기 (텍스트가 넘치는 요소들)
          const textElements = htmlItem.querySelectorAll('*');
          textElements.forEach((textEl) => {
            const htmlTextEl = textEl as HTMLElement;

            // 실제 텍스트 내용이 있고 넘치는 요소만 처리
            if (
              htmlTextEl.textContent?.trim() &&
              (htmlTextEl.scrollWidth > htmlTextEl.clientWidth ||
                htmlTextEl.scrollHeight > htmlTextEl.clientHeight)
            ) {
              // 원래 내용과 스타일 저장
              originalContents.set(htmlTextEl, htmlTextEl.textContent);
              originalStyles.set(htmlTextEl, {
                overflow: htmlTextEl.style.overflow,
                textOverflow: htmlTextEl.style.textOverflow,
                whiteSpace: htmlTextEl.style.whiteSpace,
                display: htmlTextEl.style.display,
                width: htmlTextEl.style.width,
              });

              // 글자 수 계산하여 말줄임표를 수동으로 적용
              const text = htmlTextEl.textContent || '';
              const availableWidth = htmlTextEl.clientWidth;
              const fontSize = parseFloat(
                window.getComputedStyle(htmlTextEl).fontSize,
              );

              // 글자당 평균 너비를 폰트 크기의 약 60%로 추정
              const charWidth = fontSize * 0.6;

              // 사용 가능한 너비에 맞는 글자 수 계산 (말줄임표 공간 확보를 위해 -3)
              const maxChars = Math.floor(availableWidth / charWidth) - 3;

              if (text.length > maxChars && maxChars > 3) {
                // 말줄임표를 수동으로 추가
                htmlTextEl.textContent = text.substring(0, maxChars) + '...';
              }
            }
          });
        });

        // 스크롤이 있는 모든 요소 찾기
        const scrollElements = element.querySelectorAll('*');
        scrollElements.forEach((el) => {
          const htmlEl = el as HTMLElement;

          // 타임테이블 아이템은 이미 처리했으므로 건너뛰기
          if (timeTableItems && Array.from(timeTableItems).includes(el)) {
            return;
          }

          // 텍스트 오버플로우가 필요한 요소 찾기
          const computedStyle = window.getComputedStyle(htmlEl);
          if (
            computedStyle.textOverflow === 'ellipsis' &&
            htmlEl.textContent?.trim() &&
            (htmlEl.scrollWidth > htmlEl.clientWidth ||
              htmlEl.scrollHeight > htmlEl.clientHeight)
          ) {
            // 원래 내용 저장
            originalContents.set(htmlEl, htmlEl.textContent);
            originalStyles.set(htmlEl, {
              overflow: htmlEl.style.overflow,
              textOverflow: htmlEl.style.textOverflow,
              whiteSpace: htmlEl.style.whiteSpace,
              width: htmlEl.style.width,
              maxWidth: htmlEl.style.maxWidth,
              display: htmlEl.style.display,
            });

            // 글자 수 계산하여 말줄임표를 수동으로 적용
            const text = htmlEl.textContent || '';
            const availableWidth = htmlEl.clientWidth;
            const fontSize = parseFloat(
              window.getComputedStyle(htmlEl).fontSize,
            );

            // 글자당 평균 너비를 폰트 크기의 약 60%로 추정
            const charWidth = fontSize * 0.6;

            // 사용 가능한 너비에 맞는 글자 수 계산 (말줄임표 공간 확보)
            const maxChars = Math.floor(availableWidth / charWidth) - 3;

            if (text.length > maxChars && maxChars > 3) {
              // 말줄임표를 수동으로 추가
              htmlEl.textContent = text.substring(0, maxChars) + '...';
            }
          }

          // 스크롤이 있는 요소 찾기
          if (
            htmlEl.scrollHeight > htmlEl.clientHeight ||
            htmlEl.scrollWidth > htmlEl.clientWidth
          ) {
            // 패딩과 관련된 스타일도 저장
            const computedStyle = window.getComputedStyle(htmlEl);
            originalStyles.set(htmlEl, {
              overflow: htmlEl.style.overflow,
              height: htmlEl.style.height,
              maxHeight: htmlEl.style.maxHeight,
              paddingTop: htmlEl.style.paddingTop,
              paddingRight: htmlEl.style.paddingRight,
              paddingBottom: htmlEl.style.paddingBottom,
              paddingLeft: htmlEl.style.paddingLeft,
              boxSizing: htmlEl.style.boxSizing,
              border: htmlEl.style.border,
              borderWidth: htmlEl.style.borderWidth,
              margin: htmlEl.style.margin,
            });

            // 기존 패딩 값 가져오기
            const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
            const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
            const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
            const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;

            // 스크롤 요소의 스타일 변경
            htmlEl.style.overflow = 'visible';
            htmlEl.style.height = 'auto';
            htmlEl.style.maxHeight = 'none';

            // 패딩 유지하면서 overflow 설정
            htmlEl.style.boxSizing = 'border-box';
            htmlEl.style.paddingTop = `${paddingTop}px`;
            htmlEl.style.paddingRight = `${paddingRight}px`;
            htmlEl.style.paddingBottom = `${paddingBottom}px`;
            htmlEl.style.paddingLeft = `${paddingLeft}px`;
          }
        });

        // 메인 요소 스타일도 저장 및 수정
        const mainComputedStyle = window.getComputedStyle(element);
        originalStyles.set(element, {
          overflow: element.style.overflow,
          height: element.style.height,
          maxHeight: element.style.maxHeight,
          paddingTop: element.style.paddingTop,
          paddingRight: element.style.paddingRight,
          paddingBottom: element.style.paddingBottom,
          paddingLeft: element.style.paddingLeft,
          boxSizing: element.style.boxSizing,
        });

        // 메인 요소의 패딩 값 가져오기
        const mainPaddingTop = parseFloat(mainComputedStyle.paddingTop) || 0;
        const mainPaddingRight =
          parseFloat(mainComputedStyle.paddingRight) || 0;
        const mainPaddingBottom =
          parseFloat(mainComputedStyle.paddingBottom) || 0;
        const mainPaddingLeft = parseFloat(mainComputedStyle.paddingLeft) || 0;

        element.style.overflow = 'visible';
        element.style.height = 'auto';
        element.style.maxHeight = 'none';
        element.style.boxSizing = 'border-box';
        element.style.paddingTop = `${mainPaddingTop}px`;
        element.style.paddingRight = `${mainPaddingRight}px`;
        element.style.paddingBottom = `${mainPaddingBottom}px`;
        element.style.paddingLeft = `${mainPaddingLeft}px`;

        const scale = window.devicePixelRatio * 2;

        // 수정된 후 전체 크기 다시 계산
        // reflow를 유도하기 위해 강제로 offsetHeight 접근
        element.offsetHeight;

        // 패딩을 포함한 전체 크기 계산
        const fullHeight = Math.max(
          element.scrollHeight,
          element.offsetHeight,
          element.clientHeight,
        );
        const fullWidth = Math.max(
          element.scrollWidth,
          element.offsetWidth,
          element.clientWidth,
        );

        // 패딩을 고려한 추가 여백 계산 (모든 요소의 패딩 합산을 고려하기 힘들기 때문에 대략적인 여백 추가)
        const paddingBuffer = 20; // 여분의 여백

        const blob = await domtoimage.toBlob(element, {
          filter: (node: Node) => {
            const el = node as Element;
            return !excludeTags.includes(el.tagName);
          },
          quality: 1,
          height: (fullHeight + paddingBuffer) * scale,
          width: (fullWidth + paddingBuffer) * scale,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: `${fullWidth}px`,
            height: `${fullHeight}px`,
            padding: '0',
            margin: '0',
          },
        });

        // 원래 스타일과 내용으로 복원
        scrollElements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          const originalStyle = originalStyles.get(htmlEl);
          const originalContent = originalContents.get(htmlEl);

          if (originalContent) {
            htmlEl.textContent = originalContent;
          }

          if (originalStyle) {
            // 기본 스타일 복원
            htmlEl.style.overflow = originalStyle.overflow || '';
            htmlEl.style.height = originalStyle.height || '';
            htmlEl.style.maxHeight = originalStyle.maxHeight || '';

            // 텍스트 스타일 복원
            if (originalStyle.textOverflow) {
              htmlEl.style.textOverflow = originalStyle.textOverflow;
            }
            if (originalStyle.whiteSpace) {
              htmlEl.style.whiteSpace = originalStyle.whiteSpace;
            }
            if (originalStyle.width) {
              htmlEl.style.width = originalStyle.width;
            }
            if (originalStyle.maxWidth) {
              htmlEl.style.maxWidth = originalStyle.maxWidth;
            }
            if (originalStyle.display) {
              htmlEl.style.display = originalStyle.display;
            }

            // 패딩 및 박스 모델 복원
            if (originalStyle.paddingTop) {
              htmlEl.style.paddingTop = originalStyle.paddingTop;
            }
            if (originalStyle.paddingRight) {
              htmlEl.style.paddingRight = originalStyle.paddingRight;
            }
            if (originalStyle.paddingBottom) {
              htmlEl.style.paddingBottom = originalStyle.paddingBottom;
            }
            if (originalStyle.paddingLeft) {
              htmlEl.style.paddingLeft = originalStyle.paddingLeft;
            }
            if (originalStyle.boxSizing) {
              htmlEl.style.boxSizing = originalStyle.boxSizing;
            }
            if (originalStyle.border) {
              htmlEl.style.border = originalStyle.border;
            }
            if (originalStyle.borderWidth) {
              htmlEl.style.borderWidth = originalStyle.borderWidth;
            }
            if (originalStyle.margin) {
              htmlEl.style.margin = originalStyle.margin;
            }
          }
        });

        // 타임테이블 아이템 복원
        timeTableItems.forEach((item) => {
          const htmlItem = item as HTMLElement;
          const originalStyle = originalStyles.get(htmlItem);

          if (originalStyle) {
            htmlItem.style.overflow = originalStyle.overflow || '';
            htmlItem.style.textOverflow = originalStyle.textOverflow || '';
            htmlItem.style.whiteSpace = originalStyle.whiteSpace || '';
            htmlItem.style.display = originalStyle.display || '';
            htmlItem.style.width = originalStyle.width || '';
          }

          // 자식 요소들도 복원
          const textElements = htmlItem.querySelectorAll('*');
          textElements.forEach((textEl) => {
            const htmlTextEl = textEl as HTMLElement;
            const originalContent = originalContents.get(htmlTextEl);
            const textOriginalStyle = originalStyles.get(htmlTextEl);

            if (originalContent) {
              htmlTextEl.textContent = originalContent;
            }

            if (textOriginalStyle) {
              htmlTextEl.style.overflow = textOriginalStyle.overflow || '';
              htmlTextEl.style.textOverflow =
                textOriginalStyle.textOverflow || '';
              htmlTextEl.style.whiteSpace = textOriginalStyle.whiteSpace || '';
              htmlTextEl.style.display = textOriginalStyle.display || '';
              htmlTextEl.style.width = textOriginalStyle.width || '';
            }
          });
        });

        // 메인 요소 스타일 복원
        const mainOriginalStyle = originalStyles.get(element);
        if (mainOriginalStyle) {
          element.style.overflow = mainOriginalStyle.overflow || '';
          element.style.height = mainOriginalStyle.height || '';
          element.style.maxHeight = mainOriginalStyle.maxHeight || '';
          element.style.paddingTop = mainOriginalStyle.paddingTop || '';
          element.style.paddingRight = mainOriginalStyle.paddingRight || '';
          element.style.paddingBottom = mainOriginalStyle.paddingBottom || '';
          element.style.paddingLeft = mainOriginalStyle.paddingLeft || '';
          element.style.boxSizing = mainOriginalStyle.boxSizing || '';
        }

        saveAs(blob, fileName);
      } catch (error) {
        console.error('이미지 생성 실패:', error);
        throw error;
      }
    }
  };

  return {
    elementRef,
    downloadImage,
  };
};
