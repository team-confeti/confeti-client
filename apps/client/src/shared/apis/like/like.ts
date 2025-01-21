import { END_POINT } from '@shared/constants/api';
import { BaseResponseWithoutData } from '@shared/types/api';
import { del, post } from '../config/instance';

export const postLikeArtist = async (artistId: string): Promise<void> => {
  await post<BaseResponseWithoutData>(
    `${END_POINT.GET_FAVORITE_ARTISTS}/${artistId}`,
  );
  console.log('postLikeArtist', artistId);
};

export const deleteLikeArtist = async (artistId: string): Promise<void> => {
  await del<BaseResponseWithoutData>(
    `${END_POINT.GET_FAVORITE_ARTISTS}/${artistId}`,
  );
};

// TODO: postLikeFestival, deleteLikeFestival API 추가
export const postLikeFestival = async (festivalId: number): Promise<void> => {
  await post<BaseResponseWithoutData>(
    `${END_POINT.POST_LIKE_FESTIVAL}/${festivalId}`,
  );
};

export const deleteLikeFestival = async (festivalId: number): Promise<void> => {
  await del<BaseResponseWithoutData>(
    `${END_POINT.POST_LIKE_FESTIVAL}/${festivalId}`,
  );
};

// TODO: postLikeConcert, deleteLikeConcert API 추가
