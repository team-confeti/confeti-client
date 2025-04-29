import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@confeti/design-system';
import { patchUserInfo } from '@shared/apis/user/user';
import { USER_QUERY_KEY } from '@shared/apis/user/user-queries';
import { UserInfo } from '@shared/types/user-response';

export const useUserProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userInfo: UserInfo) => patchUserInfo(userInfo),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.PROFILE(),
      });
      toast({ text: '성공적으로 저장되었어요!', position: 'middleCenter' });
    },
  });
};
