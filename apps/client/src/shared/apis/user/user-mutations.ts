import { mutationOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { END_POINT } from '@shared/constants/api';
import { USER_MUTATION_KEY } from '@shared/constants/mutation-key';
import { UserInfo } from '@shared/types/user-response';

import { patch } from '../config/instance';

export const USER_MUTATION_OPTIONS = {
  PATCH_PROFILE: () =>
    mutationOptions({
      mutationKey: USER_MUTATION_KEY.PATCH_PROFILE(),
      mutationFn: (formData: FormData) => patchUserInfo(formData),
    }),
};

export const patchUserInfo = async (formData: FormData): Promise<UserInfo> => {
  const response = await patch<BaseResponse<UserInfo>>(
    END_POINT.PATCH_USER_INFO,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
