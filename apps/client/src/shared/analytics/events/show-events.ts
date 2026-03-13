import type { ShowEventDefinitions } from './schema';

export const showEvents = [
  {
    name: 'show_delete_account',
    type: 'page',
  },
  {
    name: 'show_withdraw_confirm_dialog',
    type: 'component',
  },
  {
    name: 'show_onboarding_artist_search',
    type: 'page',
  },
] as const satisfies ShowEventDefinitions;
