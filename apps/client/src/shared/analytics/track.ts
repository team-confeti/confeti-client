import { track } from '@amplitude/analytics-browser';

import {
  type ClickEventName,
  type ClickEventPayload,
  type ShowEventName,
  type ShowEventPayload,
} from './events/types';
import { showEvents } from './events/types';

const trackEvent = (
  eventName: ShowEventName | ClickEventName,
  params?: object,
): void => {
  if (!import.meta.env.PROD) {
    return;
  }

  track(eventName, params);
};

export const trackShowEvent = (event: ShowEventPayload): void => {
  const showEventDefinition = showEvents.find(
    (showEvent) => showEvent.name === event.name,
  );

  if (!showEventDefinition) {
    trackEvent(event.name, event.params);
    return;
  }

  trackEvent(event.name, {
    ...(event.params ?? {}),
    type: showEventDefinition.type,
  });
};

export const trackClickEvent = (event: ClickEventPayload): void => {
  trackEvent(event.name, event.params);
};

export { trackEvent };
