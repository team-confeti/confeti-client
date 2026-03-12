import { track } from '@amplitude/analytics-browser';

import {
  type ClickEventName,
  type ClickEventPayload,
  type ShowEventName,
  type ShowEventPayload,
} from './events/events';

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
  trackEvent(event.name, event.params);
};

export const trackClickEvent = (event: ClickEventPayload): void => {
  trackEvent(event.name, event.params);
};

export { trackEvent };
