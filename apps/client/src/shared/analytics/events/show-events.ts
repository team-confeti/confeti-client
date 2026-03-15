import type { ShowEventDefinitions } from './schema';

export const showEvents = [
  {
    name: 'show_home',
    type: 'page',
  },
  {
    name: 'show_search_home',
    type: 'page',
  },
  {
    name: 'show_search_result',
    type: 'page',
  },
  {
    name: 'show_search_no_result',
    type: 'page',
  },
  {
    name: 'show_concert_detail',
    type: 'page',
  },
  {
    name: 'show_festival_detail',
    type: 'page',
  },
  {
    name: 'show_login',
    type: 'page',
  },
  {
    name: 'show_redirect_kakao',
    type: 'page',
  },
  {
    name: 'show_onboarding_artist_select',
    type: 'page',
  },
  {
    name: 'show_delete_account',
    type: 'page',
  },
  {
    name: 'show_onboarding_artist_edit',
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
  {
    name: 'show_onboarding_complete',
    type: 'page',
  },
  {
    name: 'show_my_profile',
    type: 'page',
  },
  {
    name: 'show_my_require_login',
    type: 'page',
  },
  {
    name: 'show_my_artist',
    type: 'page',
  },
  {
    name: 'show_my_confeti',
    type: 'page',
  },
  {
    name: 'show_my_timetable',
    type: 'page',
  },
  {
    name: 'show_my_setting',
    type: 'page',
  },
  {
    name: 'show_my_edit_profile',
    type: 'page',
  },
  {
    name: 'show_my_overview',
    type: 'page',
  },
  {
    name: 'show_my_timetable_detail',
    type: 'page',
  },
  {
    name: 'show_timetable_onboarding',
    type: 'page',
  },
  {
    name: 'show_timetable_landing',
    type: 'page',
  },
  {
    name: 'show_timetable_require_login',
    type: 'page',
  },
  {
    name: 'show_timetable_add_festival',
    type: 'page',
  },
  {
    name: 'show_timetable_no_upcoming_festival',
    type: 'page',
  },
  {
    name: 'show_timetable_detail',
    type: 'page',
  },
  {
    name: 'show_setlist_add',
    type: 'page',
  },
  {
    name: 'show_setlist_add_songs',
    type: 'page',
  },
  {
    name: 'show_setlist_add_songs_confirm',
    type: 'page',
  },
  {
    name: 'show_setlist_detail',
    type: 'page',
  },
  {
    name: 'show_setlist_maintenance',
    type: 'page',
  },
  {
    name: 'show_error',
    type: 'page',
  },
  {
    name: 'show_logout_confirm_dialog',
    type: 'component',
  },
  {
    name: 'show_my_timetable_delete_confirm_dialog',
    type: 'component',
  },
  {
    name: 'show_my_timetable_delete_success_dialog',
    type: 'component',
  },
  {
    name: 'show_setlist_delete_track_confirm_dialog',
    type: 'component',
  },
  {
    name: 'show_setlist_add_song_delete_confirm_dialog',
    type: 'component',
  },
  {
    name: 'show_timetable_delete_confirm_dialog',
    type: 'component',
  },
  {
    name: 'show_timetable_delete_success_dialog',
    type: 'component',
  },
] as const satisfies ShowEventDefinitions;
