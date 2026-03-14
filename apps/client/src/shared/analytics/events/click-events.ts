import type { ClickEventDefinitions } from './schema';

export const clickEvents = [
  {
    name: 'click_navigation_logo',
  },
  {
    name: 'click_navigation_search',
  },
  {
    name: 'click_navigation_my',
  },
  {
    name: 'click_navigation_back',
  },
  {
    name: 'click_navigation_tab',
    params: {
      tab: {
        type: 'enum',
        required: true,
        oneOf: ['home', 'timetable', 'setlist'],
      },
    },
  },
  {
    name: 'click_footer_external_link',
    params: {
      link_name: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_scroll_to_top',
  },
  {
    name: 'click_box_show_more',
    params: {
      source_page: {
        type: 'enum',
        required: true,
        oneOf: [
          'home',
          'search',
          'concert_detail',
          'festival_detail',
          'login',
          'redirect_kakao',
          'onboarding',
          'my_profile',
          'my_require_login',
          'my_artist',
          'my_confeti',
          'my_timetable',
          'my_setting',
          'my_delete_account',
          'my_edit_profile',
          'my_overview',
          'my_timetable_detail',
          'timetable',
          'timetable_require_login',
          'timetable_add_festival',
          'timetable_delete_festival',
          'timetable_no_upcoming_festival',
          'timetable_detail',
          'setlist_add',
          'setlist_add_songs',
          'setlist_detail',
          'setlist_maintenance',
          'error',
          'unknown',
        ],
      },
      section: {
        type: 'enum',
        required: true,
        oneOf: ['festival_artist', 'favorite_performance', 'favorite_artist'],
      },
    },
  },
  {
    name: 'click_like_performance',
    params: {
      source_page: {
        type: 'string',
        required: true,
      },
      action: {
        type: 'enum',
        required: true,
        oneOf: ['LIKE', 'UNLIKE'],
      },
      target_type: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_like_artist',
    params: {
      source_page: {
        type: 'enum',
        required: true,
        oneOf: [
          'home',
          'search',
          'concert_detail',
          'festival_detail',
          'login',
          'redirect_kakao',
          'onboarding',
          'my_profile',
          'my_require_login',
          'my_artist',
          'my_confeti',
          'my_timetable',
          'my_setting',
          'my_delete_account',
          'my_edit_profile',
          'my_overview',
          'my_timetable_detail',
          'timetable',
          'timetable_require_login',
          'timetable_add_festival',
          'timetable_delete_festival',
          'timetable_no_upcoming_festival',
          'timetable_detail',
          'setlist_add',
          'setlist_add_songs',
          'setlist_detail',
          'setlist_maintenance',
          'error',
          'unknown',
        ],
      },
      action: {
        type: 'enum',
        required: true,
        oneOf: ['LIKE', 'UNLIKE'],
      },
      target_type: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_login_close',
  },
  {
    name: 'click_login_provider',
    params: {
      provider: {
        type: 'enum',
        required: true,
        oneOf: ['kakao', 'apple'],
      },
    },
  },
  {
    name: 'click_login_policy_link',
    params: {
      link_name: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_require_login',
  },
  {
    name: 'click_error_go_home',
  },
  {
    name: 'click_onboarding_search_focus',
  },
  {
    name: 'click_onboarding_edit_selected_artists',
  },
  {
    name: 'click_onboarding_select_artist',
    params: {
      target_id: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_onboarding_complete',
  },
  {
    name: 'click_onboarding_delete_artist',
    params: {
      target_id: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_onboarding_delete_selected_artists',
    params: {
      count: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_home_carousel_performance',
    params: {
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_home_ticket_opening_performance',
    params: {
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_home_suggest_performance',
    params: {
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_home_suggest_music_detail',
    params: {
      target_type: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_music_play_toggle',
    params: {
      source_page: {
        type: 'enum',
        required: true,
        oneOf: [
          'home',
          'search',
          'concert_detail',
          'festival_detail',
          'login',
          'redirect_kakao',
          'onboarding',
          'my_profile',
          'my_require_login',
          'my_artist',
          'my_confeti',
          'my_timetable',
          'my_setting',
          'my_delete_account',
          'my_edit_profile',
          'my_overview',
          'my_timetable_detail',
          'timetable',
          'timetable_require_login',
          'timetable_add_festival',
          'timetable_delete_festival',
          'timetable_no_upcoming_festival',
          'timetable_detail',
          'setlist_add',
          'setlist_add_songs',
          'setlist_detail',
          'setlist_maintenance',
          'error',
          'unknown',
        ],
      },
      target_id: {
        type: 'string',
        required: true,
      },
      section: {
        type: 'enum',
        required: true,
        oneOf: [
          'setlist_track',
          'related_songs',
          'search_result',
          'artist_result',
          'recommend_music',
        ],
      },
    },
  },
  {
    name: 'click_search_popular_keyword',
    params: {
      keyword: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_search_recent_keyword',
    params: {
      keyword: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_search_recent_keyword_clear_all',
  },
  {
    name: 'click_search_recent_keyword_delete',
    params: {
      keyword: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_search_recent_performance',
    params: {
      target_type: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_search_suggestion_artist',
    params: {
      keyword: {
        type: 'string',
        required: true,
      },
      target_type: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_search_suggestion_performance',
    params: {
      keyword: {
        type: 'string',
        required: true,
      },
      target_type: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_search_result_performance',
    params: {
      target_type: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_my_profile_setting',
  },
  {
    name: 'click_my_profile_edit',
  },
  {
    name: 'click_my_profile_select_artist',
    params: {
      source_page: {
        type: 'enum',
        required: true,
        oneOf: [
          'home',
          'search',
          'concert_detail',
          'festival_detail',
          'login',
          'redirect_kakao',
          'onboarding',
          'my_profile',
          'my_require_login',
          'my_artist',
          'my_confeti',
          'my_timetable',
          'my_setting',
          'my_delete_account',
          'my_edit_profile',
          'my_overview',
          'my_timetable_detail',
          'timetable',
          'timetable_require_login',
          'timetable_add_festival',
          'timetable_delete_festival',
          'timetable_no_upcoming_festival',
          'timetable_detail',
          'setlist_add',
          'setlist_add_songs',
          'setlist_detail',
          'setlist_maintenance',
          'error',
          'unknown',
        ],
      },
    },
  },
  {
    name: 'click_my_profile_preview_performance',
    params: {
      target_type: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_my_activity_summary',
    params: {
      summary_type: {
        type: 'enum',
        required: true,
        oneOf: ['timetable', 'setlist'],
      },
    },
  },
  {
    name: 'click_my_artist_sort',
    params: {
      sort: {
        type: 'enum',
        required: true,
        oneOf: ['createdAt', 'oldestFirst', 'alphabetically'],
      },
    },
  },
  {
    name: 'click_my_confeti_category',
    params: {
      category: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_my_confeti_hide_past_toggle',
    params: {
      checked: {
        type: 'boolean',
        required: true,
      },
    },
  },
  {
    name: 'click_my_timetable_sort',
    params: {
      sort: {
        type: 'enum',
        required: true,
        oneOf: ['createdAt', 'oldestFirst', 'alphabetically'],
      },
    },
  },
  {
    name: 'click_my_timetable_edit',
  },
  {
    name: 'click_my_timetable_cancel_edit',
  },
  {
    name: 'click_my_timetable_open_delete',
    params: {
      count: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_my_timetable_confirm_delete',
    params: {
      action: {
        type: 'enum',
        required: true,
        oneOf: ['cancel', 'confirm'],
      },
    },
  },
  {
    name: 'click_my_timetable_item',
    params: {
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_logout_entry',
  },
  {
    name: 'click_logout_confirm',
  },
  {
    name: 'click_setting_delete_account',
  },
  {
    name: 'click_setting_external_link',
    params: {
      link_name: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_withdraw_reason_select',
    params: {
      reason: {
        type: 'enum',
        required: true,
        oneOf: ['no_events', 'frequent_errors', 'inconvenient', 'rejoin'],
      },
    },
  },
  {
    name: 'click_delete_account_open',
  },
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
  {
    name: 'click_my_overview_sort',
    params: {
      sort: {
        type: 'enum',
        required: true,
        oneOf: ['createdAt', 'oldestFirst', 'alphabetically'],
      },
    },
  },
  {
    name: 'click_my_overview_item',
    params: {
      section: {
        type: 'enum',
        required: true,
        oneOf: ['favorite_performance', 'setlist', 'timetable'],
      },
      target_id: {
        type: 'number',
        required: false,
      },
    },
  },
  {
    name: 'click_profile_save',
  },
  {
    name: 'click_profile_edit_image',
  },
  {
    name: 'click_setlist_search_artist_suggestion',
    params: {
      keyword: {
        type: 'string',
        required: true,
      },
      target_type: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_setlist_search_performance_suggestion',
    params: {
      keyword: {
        type: 'string',
        required: true,
      },
      target_type: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_setlist_select_performance',
    params: {
      target_type: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'number',
        required: true,
      },
      isSelected: {
        type: 'boolean',
        required: true,
      },
    },
  },
  {
    name: 'click_setlist_create',
    params: {
      count: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_setlist_detail_edit',
    params: {
      action: {
        type: 'enum',
        required: true,
        oneOf: [
          'open',
          'cancel',
          'confirm',
          'next',
          'retry',
          'skip',
          'start',
          'complete',
          'select',
          'deselect',
        ],
      },
    },
  },
  {
    name: 'click_setlist_detail_add_music',
  },
  {
    name: 'click_setlist_empty_add_music',
  },
  {
    name: 'click_setlist_open_delete_track',
    params: {
      target_id: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_setlist_confirm_delete_track',
    params: {
      target_id: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_setlist_confirm_add_songs',
    params: {
      count: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_song_add_to_queue',
    params: {
      source_page: {
        type: 'enum',
        required: true,
        oneOf: [
          'home',
          'search',
          'concert_detail',
          'festival_detail',
          'login',
          'redirect_kakao',
          'onboarding',
          'my_profile',
          'my_require_login',
          'my_artist',
          'my_confeti',
          'my_timetable',
          'my_setting',
          'my_delete_account',
          'my_edit_profile',
          'my_overview',
          'my_timetable_detail',
          'timetable',
          'timetable_require_login',
          'timetable_add_festival',
          'timetable_delete_festival',
          'timetable_no_upcoming_festival',
          'timetable_detail',
          'setlist_add',
          'setlist_add_songs',
          'setlist_detail',
          'setlist_maintenance',
          'error',
          'unknown',
        ],
      },
      target_id: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_song_remove_from_queue',
    params: {
      source_page: {
        type: 'enum',
        required: true,
        oneOf: [
          'home',
          'search',
          'concert_detail',
          'festival_detail',
          'login',
          'redirect_kakao',
          'onboarding',
          'my_profile',
          'my_require_login',
          'my_artist',
          'my_confeti',
          'my_timetable',
          'my_setting',
          'my_delete_account',
          'my_edit_profile',
          'my_overview',
          'my_timetable_detail',
          'timetable',
          'timetable_require_login',
          'timetable_add_festival',
          'timetable_delete_festival',
          'timetable_no_upcoming_festival',
          'timetable_detail',
          'setlist_add',
          'setlist_add_songs',
          'setlist_detail',
          'setlist_maintenance',
          'error',
          'unknown',
        ],
      },
      target_id: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_setlist_add_artist_suggestion',
    params: {
      keyword: {
        type: 'string',
        required: true,
      },
      target_id: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_timetable_create',
  },
  {
    name: 'click_timetable_select_festival',
    params: {
      target_id: {
        type: 'number',
        required: true,
      },
      action: {
        type: 'enum',
        required: true,
        oneOf: [
          'open',
          'cancel',
          'confirm',
          'next',
          'retry',
          'skip',
          'start',
          'complete',
          'select',
          'deselect',
        ],
      },
    },
  },
  {
    name: 'click_timetable_edit_mode',
    params: {
      action: {
        type: 'enum',
        required: true,
        oneOf: ['start', 'complete'],
      },
    },
  },
  {
    name: 'click_timetable_delete_selection',
    params: {
      action: {
        type: 'enum',
        required: true,
        oneOf: ['cancel', 'open_delete'],
      },
      count: {
        type: 'number',
        required: false,
      },
    },
  },
  {
    name: 'click_timetable_add_festival_select',
    params: {
      target_id: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_timetable_add_festival',
    params: {
      count: {
        type: 'number',
        required: true,
      },
    },
  },
  {
    name: 'click_timetable_dropdown_action',
    params: {
      action: {
        type: 'enum',
        required: true,
        oneOf: ['add'],
      },
    },
  },
  {
    name: 'click_timetable_download_image',
  },
  {
    name: 'click_timetable_toggle_block',
    params: {
      target_id: {
        type: 'number',
        required: true,
      },
      action: {
        type: 'enum',
        required: true,
        oneOf: [
          'open',
          'cancel',
          'confirm',
          'next',
          'retry',
          'skip',
          'start',
          'complete',
          'select',
          'deselect',
        ],
      },
    },
  },
  {
    name: 'click_timetable_onboarding_action',
    params: {
      step: {
        type: 'string',
        required: true,
      },
      action: {
        type: 'enum',
        required: true,
        oneOf: [
          'open',
          'cancel',
          'confirm',
          'next',
          'retry',
          'skip',
          'start',
          'complete',
          'select',
          'deselect',
        ],
      },
    },
  },
  {
    name: 'click_timetable_festival_request_form',
  },
  {
    name: 'click_reservation_link',
    params: {
      vendor: {
        type: 'string',
        required: true,
      },
    },
  },
  {
    name: 'click_copy_address',
  },
  {
    name: 'click_open_map',
  },
] as const satisfies ClickEventDefinitions;
