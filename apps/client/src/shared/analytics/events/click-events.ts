import type { EventDefinitions } from './schema';

export const clickEvents = [
  {
    name: 'click_withdraw_confirm',
    params: {
      reason: {
        type: 'string',
        required: false,
      },
      description: {
        type: 'string',
        required: false,
      },
    },
  },
] as const satisfies EventDefinitions;
