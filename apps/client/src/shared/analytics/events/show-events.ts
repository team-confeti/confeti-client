import type { EventDefinitions } from './schema';

export const showEvents = [
  {
    name: 'show_delete_account_page',
    params: {},
  },
  {
    name: 'show_withdraw_confirm_dialog',
    params: {},
  },
  {
    name: 'show_onboarding_artist_search',
    params: {},
  },
] as const satisfies EventDefinitions;
