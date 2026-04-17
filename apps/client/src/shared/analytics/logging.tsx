import { Children, cloneElement, type ReactElement, useEffect } from 'react';

import type { ClickEventPayload, ShowEventPayload } from './events/types';
import { trackClickEvent, trackShowEvent } from './track';

type LogClickEventProps = ClickEventPayload & {
  children: ReactElement<{
    onClick?: (...args: unknown[]) => void;
  }>;
};

export const LogClickEvent = ({
  children,
  ...eventPayload
}: LogClickEventProps) => {
  const child = Children.only(children);

  return cloneElement(child, {
    onClick: (...args: unknown[]) => {
      trackClickEvent(eventPayload);

      return child.props.onClick?.(...args);
    },
  });
};

export const LogShowEvent = (props: ShowEventPayload) => {
  useEffect(function trackShowEventOnMount() {
    trackShowEvent(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export const logClickEvent = (eventPayload: ClickEventPayload) => {
  trackClickEvent(eventPayload);
};
