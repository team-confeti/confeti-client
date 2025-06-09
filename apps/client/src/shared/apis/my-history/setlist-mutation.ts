import { del, patch, post } from '@shared/apis/config/instance';
import { END_POINT } from '@shared/constants/api';
import { BaseResponse } from '@shared/types/api';
import {
  AddMusicToSetListRequest,
  SetListPerformance,
} from '@shared/types/my-history-response';

export const postStartEditSetList = async (
  setlistId: number,
): Promise<void> => {
  await post<BaseResponse<void>>(END_POINT.POST_START_EDIT_SETLIST(setlistId));
};

export const postAddPerformanceToSetList = async (
  items: Pick<SetListPerformance, 'type' | 'typeId'>[],
) => {
  const response = await post<BaseResponse<void>>(
    END_POINT.POST_ADD_PERFORMANCE_TO_SET_LIST,
    items,
  );

  return response.data;
};

export const postAddMusicToSetList = async (
  setlistId: number,
  musics: AddMusicToSetListRequest[],
) => {
  await post<BaseResponse<void>>(
    END_POINT.POST_ADD_MUSIC_TO_SETLIST(setlistId),
    musics,
  );
};

export const patchCompleteEditSetList = async (
  setlistId: number,
): Promise<void> => {
  await patch<BaseResponse<void>>(
    END_POINT.POST_COMPLETE_EDIT_SETLIST(setlistId),
  );
};

export const patchReorderSetList = async (
  setlistId: number,
  tracks: { musicId: string; orders: number }[],
): Promise<void> => {
  await patch<BaseResponse<void>>(
    END_POINT.PATCH_REORDER_SETLIST(setlistId),
    tracks,
  );
};

export const deleteMusicFromSetList = async (
  setlistId: number,
  orders: number,
): Promise<string> => {
  const response = await del<BaseResponse<string>>(
    END_POINT.DELETE_MUSIC_FROM_SETLIST(setlistId, orders),
  );
  return response.data;
};

export const deleteCancelEditSetList = async (
  setlistId: number,
): Promise<void> => {
  await del<BaseResponse<void>>(
    END_POINT.DELETE_CANCEL_EDIT_SETLIST(setlistId),
  );
};
