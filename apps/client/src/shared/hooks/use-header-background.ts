import { useEffect, useState } from 'react';

const TICKET_SECTION_SELECTOR = '[data-ticket-section="true"]';
const HEADER_SELECTOR = 'header';

export const useHeaderBackground = (isHomePage: boolean) => {
  const [hasPassedTicketSection, setHasPassedTicketSection] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    let scrollHandler: (() => void) | null = null;

    const setupScrollHandler = () => {
      const ticketSection = document.querySelector(TICKET_SECTION_SELECTOR);

      if (!ticketSection) {
        requestAnimationFrame(setupScrollHandler);
        return;
      }

      const headerElement = document.querySelector(HEADER_SELECTOR);
      const headerHeight = headerElement
        ? Math.ceil(headerElement.getBoundingClientRect().height)
        : 54;

      const checkIfPassed = () => {
        const rect = ticketSection.getBoundingClientRect();
        return rect.bottom <= headerHeight;
      };

      setHasPassedTicketSection(checkIfPassed());

      scrollHandler = () => {
        setHasPassedTicketSection(checkIfPassed());
      };

      window.addEventListener('scroll', scrollHandler, { passive: true });
    };

    setupScrollHandler();

    return () => {
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler);
      }
    };
  }, [isHomePage]);

  return hasPassedTicketSection;
};
