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
  useEffect(() => {
    trackShowEvent(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

type ClickEventPayloadResolver<TArgs extends unknown[]> =
  | ClickEventPayload
  | ((...args: TArgs) => ClickEventPayload);

export const withClickEvent =
  <TArgs extends unknown[]>(
    eventPayload: ClickEventPayloadResolver<TArgs>,
    handler?: (...args: TArgs) => void,
  ) =>
  (...args: TArgs) => {
    const payload =
      typeof eventPayload === 'function' ? eventPayload(...args) : eventPayload;

    trackClickEvent(payload);

    return handler?.(...args);
  };
