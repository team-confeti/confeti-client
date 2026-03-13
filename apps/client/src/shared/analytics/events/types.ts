import { clickEvents } from './click-events';
import type {
  EventNameFromDefinitions,
  EventParamsByNameFromDefinitions,
  EventPayloadFromParamsByName,
} from './schema';
import { showEvents } from './show-events';

export { clickEvents } from './click-events';
export type { EventDefinitions, EventParamType } from './schema';
export { showEvents } from './show-events';

export type ClickEventName = EventNameFromDefinitions<typeof clickEvents>;
export type ClickEventParamsByName = EventParamsByNameFromDefinitions<
  typeof clickEvents
>;
export type ClickEventPayload = EventPayloadFromParamsByName<
  ClickEventName,
  ClickEventParamsByName
>;

export type ShowEventName = EventNameFromDefinitions<typeof showEvents>;
export type ShowEventParamsByName = EventParamsByNameFromDefinitions<
  typeof showEvents
>;
export type ShowEventPayload = EventPayloadFromParamsByName<
  ShowEventName,
  ShowEventParamsByName
>;

export type LogShowEvent = { kind: 'show' } & ShowEventPayload;
export type LogClickEvent = { kind: 'click' } & ClickEventPayload;
export type LogEvent = LogShowEvent | LogClickEvent;
