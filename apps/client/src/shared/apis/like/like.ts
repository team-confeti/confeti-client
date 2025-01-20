import { END_POINT } from '@shared/constants/api';
import { instance } from '../api';
import { BaseResponseWithoutData } from '@shared/types/api';

export const postLikeArtist = async (artistId: string): Promise<void> => {
  await instance.delete<BaseResponseWithoutData>(
    `${END_POINT.GET_FAVORITE_ARTISTS}/${artistId}`,
  );
};

export const deleteLikeArtist = async (artistId: string): Promise<void> => {
  await instance.delete<BaseResponseWithoutData>(
    `${END_POINT.GET_FAVORITE_ARTISTS}/${artistId}`,
  );
};

// TODO: postLikeFestival, deleteLikeFestival API 추가

// TODO: postLikeConcert, deleteLikeConcert API 추가
