import { mutationOptions } from '@tanstack/react-query';

import { BaseResponse } from '@confeti/core/http';

import { END_POINT } from '@shared/constants/api';
import { USER_MUTATION_KEY } from '@shared/constants/mutation-key';
import { UserInfo } from '@shared/types/user-response';

import { patch } from '../config/instance';

export const USER_MUTATION_OPTIONS = {
  EDIT_PROFILE: () =>
    mutationOptions({
      mutationKey: USER_MUTATION_KEY.EDIT_PROFILE(),
      mutationFn: (userInfo: UserInfo) => patchUserInfo(userInfo),
    }),
};

export const patchUserInfo = async (userInfo: UserInfo): Promise<UserInfo> => {
  const formData = new FormData();
  formData.append('name', userInfo.name);

  if (userInfo.profileFile) {
    formData.append('profileFile', userInfo.profileFile);
  } else {
    const emptyFile = new Blob([], { type: 'image/jpeg' });
    formData.append('profileFile', emptyFile, 'empty.jpg');
  }

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
